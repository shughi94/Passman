const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  }
}
module.exports = withAuth;