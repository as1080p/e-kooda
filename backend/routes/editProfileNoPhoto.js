const express = require('express');
const router = express.Router();
const supabase = require('../config/supabaseClient');
// const multer = require('multer');

// // Setup multer for file upload
// const upload = multer({ dest: 'uploads/' });

router.post('/', /* upload.single('profile_photo'), */ async (req, res) => {
  const { full_name, phone_no, address } = req.body;
  // const profile_photo = req.file;

  if (!full_name || !phone_no || !address /* || !profile_photo */) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert profile details into the database
    const { data, error } = await supabase
      .from('profile_details')
      .insert([{ full_name, phone_no, address /*, profile_photo: 'placeholder' */ }]);

    if (error) {
      console.error("Insert Error:", error);
      throw error;
    }

    res.status(200).json({ message: 'Profile updated successfully!', data });
  } catch (err) {
    console.error("Error in editProfile:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
