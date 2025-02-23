// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

app.use('/api/auth/profile', authenticate);

module.exports = authenticate;
