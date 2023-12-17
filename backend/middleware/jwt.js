const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt = (req, res, next) => {
  const jwttoken = req.headers.authorization;
  let token = jwttoken.replace(/"/g, ''); 
  if (token) {
    try {
      const User = jwt.verify(token, process.env.USER_TOKEN_SECRET);
      req.UserId=User.id
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Token missing' });
  }
};

module.exports=jwt;
