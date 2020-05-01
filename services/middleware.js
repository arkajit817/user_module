const jwt = require('jsonwebtoken');

const config = require('../utils/config');


let checkAuthentication = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = decoded;
        
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};



module.exports = {
  checkAuthentication: checkAuthentication
}
