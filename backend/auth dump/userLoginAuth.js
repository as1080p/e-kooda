const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');

console.log('User trying to log in...')

router.post('/', async (req, res) => {
    const { email_id, password } = req.body;
    console.log(`Email: ${email_id}, Password: ${password}`);
  
    if (!email_id || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    try {

        if (data.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }    
  
        // Authenticate user using Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email_id,
            password: password,
        });

        if (authError) {
            throw authError;
        }
        
        const token = jwt.sign({ email_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
              
        res.status(200).json({ message: 'Login successful!', token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

module.exports = router;