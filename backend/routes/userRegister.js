const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');

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

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
