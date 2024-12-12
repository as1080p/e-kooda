const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
//const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { email_id, password } = req.body;

  if (!email_id || !password) {
    return res.status(400).json({ error: 'Email and Password are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('register_login')
      .insert([{ email_id, password }]);

    if (error) {
      throw error;
    }
    //const token = jwt.sign({ email_id }, process.env.JWT_SECRET, {
    //expiresIn: '1h',
    //});

    res.status(201).json({ message: 'User registered successfully!', redirect: '/editProfileNoPhoto' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
