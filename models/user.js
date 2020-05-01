'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const constants = require('../constant/constant');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    currentLogin : {
        type : Date
    },
    token : {
        type : String
    },
    refreshToken : {
        type : String
    }
});

// Virtuals

UserSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password;
});


// Validations

UserSchema.path('mobile').validate(function (mobile) {
    if (this.skipValidation()) return true;
    return mobile.length;
}, 'mobile cannot be blank');

UserSchema.path('name').validate(function (name) {
    if (this.skipValidation()) return true;
    return name.length;
}, 'name cannot be blank');

UserSchema.path('hashed_password').validate(function (name) {
    if (this.skipValidation()) return true;
    return name.length;
}, 'password cannot be blank');

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    /**
     * Validation is not required if using OAuth
     */

    skipValidation: function () {
        return false;
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    load: function (options, cb) {
        options.select = options.select || 'name mobile';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

UserSchema.plugin(require('mongoose-timestamp'));
UserSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});


const User = module.exports = mongoose.model('User', UserSchema);

User.createUser = function (reqObj) {
    let newUser = '';
    return new Promise((resolve, reject) => {
        User.findOne({ $or: [{ email: reqObj.email }, { mobile: reqObj.mobile }] }).exec().then(user => {
            if (user) {
                reject({ message: 'User already registered.' });
            } else {

                let token = jwt.sign(user, config.secretKey, { expiresIn: 900 });
                newUser = new User(reqObj);
                newUser.token = token;
                return newUser.save((err, user) => {
                    if (err) {
                        reject({ message: 'User registration failed!!! Please try again.' });
                    } else {
                        user = user.toJSON();
                        delete user.hashed_password;
                        delete user.salt;
                        // let token = jwt.sign(user, config.secretKey, { expiresIn: '7d' });
                        resolve(token);
                    }
                })
            }
        })
    })
}
