import * as authService from '../services/authService.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please add all fields' });
  }

  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error.message === 'User already exists') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.login(email, password);
    res.json(user);
  } catch (error) {
    console.error(error);
    if (error.message === 'Invalid credentials') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
