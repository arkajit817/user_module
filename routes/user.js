const express = require('express');
const _ = require('lodash');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Role = require('../models/role');
const User = require('../models/user');
const Team = require('../models/team');
const Department = require('../models/department');
const Organisation = require('../models/organisation');
const config = require('../utils/config');
const middleWare = require('../services/middleware');
const userService = require('../services/userService');

router.post('/register', function (req, res) {
    User.createUser(req.body)
        .then((token) => {
            res.status(200).json({ auth: true, token: token });
        })
        .catch(err => {
            res.status(400).json(err.message);
        })
})



router.put('/editUser/:id', middleWare.checkAuthentication, function (req, res) {
    User.find({}).exec()
        .then((users) => {
            return User.findByIdAndUpdate(req.params.id, { $set: req.body });
        })
        .then(() => {
            res.status(200).json('User edited succesfully')
        })
})

router.delete('/deleteUser/:id', middleWare.checkAuthentication,  function (req, res) {
    User.findOne({ "_id": req.params.id }).remove().exec().then(removedRow => {
        res.status(200).send();
    }).catch(error => {
        res.status(500).json({ error: error });
    });
})




router.post('/login', async function (req, res) {
    User.findOne({ $and : [{email: req.body.email}] }).populate('roles').exec().then(user => {
        if (!user) return res.status(400).json({
            failed: 'User not found.'
        });
        if (user.authenticate(req.body.password)) {
            user = user.toJSON();
            delete user.hashed_password;
            delete user.salt;
            
            let token = jwt.sign(user, config.secretKey, { expiresIn: config.tokenLife });
            let refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
            // let updateToken = await User.update({email: req.body.email }, {token : token,currentlogin:new Date()},{multi:false})
            return res.status(200).json({
                success: true,
                token: token,
                // refreshToken : refreshToken
            });
        } else {
            return res.status(401).json({
                failed: 'Unauthorized Access'
            });
        }
    }).catch(error => {
        console.log(error);
        return res.status(401).json({
            failed: 'Invalid User'
        });
    });
});


// change password
router.put('/changePassword/:id', middleWare.checkAuthentication,  (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user.authenticate(req.body.password)) {
                user.password = req.body.newPassword;
                user.save((err) => {
                    if (err) {
                        return res.status(401).json({
                            failed: 'Something went wrong... Please try again later.'
                        });
                    } else {
                        res.status(200).json({ message: 'Password changed successfully.' });
                    }
                });
            } else {
                return res.status(401).json({
                    failed: 'Please enter the right password.'
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
})











router.get('/getUsers', middleWare.checkAuthentication,  (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).send(users);
        })
});




module.exports = router;
