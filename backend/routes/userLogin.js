const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
const app = express();


app.post('/', async (req, res) => {
    const { email, password } = req.body;
  
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    try {
        const { data, error } = await supabase
          .from('register_login')
          .select('email_id, password')
          .eq('email_id', email_id)
          .eq('password', password);
    
        if (error) {
          throw error;
        }
    
        if (data.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password.' });
        }
    
        res.status(200).json({ message: 'Login successful!', user: data[0] });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

module.exports = router;