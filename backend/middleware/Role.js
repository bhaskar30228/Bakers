// In your Role.js middleware
import jwt from 'jsonwebtoken';
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Incoming token:', token); // Debug log
    console.log('Request headers:', req.headers); // Debug log
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.SeCRET_KEY);
    console.log('Decoded token:', decoded); // Debug log
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ 
      message: 'Invalid token',
      error: err.message // Include specific error
    });
  }
};

export const adminOnly = (req, res, next) => {
  console.log('User role from token:', req.user?.role); // Debug log
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};