import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

