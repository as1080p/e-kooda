const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const jwt = require('jsonwebtoken');

console.log('User trying to register...')


router.post('/', async (req, res) => {
    const { email_id, password, full_name, phone_no } = req.body;
    console.log(`Email: ${email_id}, Password: ${password}, Name: ${full_name}, Phone: ${phone_no}`);


    if (!email_id || !password || !full_name || !phone_no) {
        return res.status(400).json({ error: 'All fields except profile_photo and address are required.' });
      }
    
    try {
        console.log('we start try-catch here!');

    // Create the user in Supabase Auth
        console.log('creating user!');
        const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email_id,
        password: password,
      });
      console.log('user created!');

    if (authError) {
        console.log('error is in authError!');
        throw authError;
    }

        // Insert the user's profile into the user_profile table
    const { data: profileData, error: profileError } = await supabase
    .from('user_profile')
    .insert([{ email_id, full_name, phone_no }]);
  
    if (profileError) {
        console.log('error is in profileError!');
        throw profileError;
    }
    const token = jwt.sign({ email_id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

    res.status(201).json({ message: 'User registered successfully!', token, redirect: '/editProfileAuth' });
    } catch (err) {
        console.log('something else entirely!');
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;
