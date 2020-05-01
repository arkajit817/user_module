'use strict';

const user = require('../routes/user');



module.exports = function (app) {
    app.use('/api/user', user);

}
