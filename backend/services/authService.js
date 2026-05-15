import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const register = async (userData) => {
  const { name, email, password } = userData;

  // Check if user exists
  const userExists = await query('SELECT * FROM users WHERE email = $1', [email]);
  if (userExists.rows.length > 0) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );

  const user = newUser.rows[0];
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

export const login = async (email, password) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const getUserById = async (id) => {
  const result = await query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
