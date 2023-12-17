const jwt = require('jsonwebtoken')

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.headers['refresh-token'];
  
    if (!refreshToken) {
      return res.status(403).json({ message: 'Refresh Token not provided' });
    }
  
    jwt.verify(refreshToken, 'refresh_token_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid Refresh Token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };

  module.exports = verifyRefreshToken;