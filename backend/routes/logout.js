/*const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out. Try again.' });
    }
  res.status(200).json({ message: 'Logged out successfully.' });
  });
});

module.exports = router;
*/