const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  
  // Check for the token being sent in three different ways
  let token = req.get('Authorization') || req.query.token || req.body.token;
  
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');

    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return res.status(401).send('You are not authorized!');
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.customer;  
         
        next();
      }
    });
  } else {
    next();
  }
};