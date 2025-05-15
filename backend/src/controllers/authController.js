const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, profile } = req.body;

    // TODO: Replace with PostgreSQL queries
    // Check if user exists
    // const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    // if (existingUser.rows.length > 0) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    // const result = await db.query(
    //   'INSERT INTO users (email, password, role, profile) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [email, hashedPassword, role, profile]
    // );
    // const user = result.rows[0];

    // Generate token
    // const token = generateToken(user.id);

    res.status(201).json({
      // token,
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   role: user.role,
      //   profile: user.profile
      // }
      message: 'Registration endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // TODO: Replace with PostgreSQL queries
    // Find user
    // const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    // const user = result.rows[0];
    
    // if (!user) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Check password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Generate token
    // const token = generateToken(user.id);

    res.json({
      // token,
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   role: user.role,
      //   profile: user.profile
      // }
      message: 'Login endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 