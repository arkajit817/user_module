const mongoose = require("mongoose");

const config = require('../utils/config');

module.exports = function () {
    mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to database ' + config.database))
        .catch(err => console.error('Error in connection' + err));
}
