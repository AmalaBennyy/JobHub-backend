const admins = require('../Model/adminSchema');
const jwt = require('jsonwebtoken');

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the predefined admin with the specified email
    const admin = await admins.findOne({ email: 'admin@gmail.com' });

    if (admin) {
      // Compare the provided password with the plaintext password in the database
      const isPasswordValid = password === admin.password;

      if (isPasswordValid) {
        // Generate a JWT token for admin
        const token = jwt.sign({ userId: admin._id, role: 'admin' }, 'superkey1234');

        res.status(200).json({
            existingUser:admin,
          token,
        });
      } else {
        res.status(401).json('Invalid email or password');
      }
    } else {
      res.status(404).json('Admin not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};
