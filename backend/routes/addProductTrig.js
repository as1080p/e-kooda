require('dotenv').config(); // Load environment variables
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Initialize Express app
const router = express.Router();

// Initialize Supabase with service role key
const supabaseUrl = 'https://kyujqtzadjlebzwdrjql.supabase.co';
const serviceKey = process.env.SERVICE_KEY; // Use the service role key for server-side code

if (!serviceKey) {
  throw new Error('Supabase Service Key is missing! Ensure SERVICE_KEY is set in .env.');
}

const supabase = createClient(supabaseUrl, serviceKey);

// Function to upload a file to Supabase Storage
async function uploadFile(bucketName, filePath, fileName) {
  try {
    const file = fs.readFileSync(filePath);

    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(fileName, file, {
        contentType: 'image/jpg', // Adjust based on file type
        upsert: true, // Overwrite file if it exists
      });

    if (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }

    console.log('File uploaded successfully:', data);
    return data;
  } catch (err) {
    console.error('Error during file upload:', err.message);
    throw err;
  }
}

// Function to check if a file exists in the bucket
async function fileExists(bucketName, fileName) {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list('', {
      search: fileName,
    });

    if (error) {
      throw new Error(`Error checking file existence: ${error.message}`);
    }

    if (data.length > 0) {
      console.log(`File "${fileName}" exists in the bucket.`);
      return true;
    } else {
      console.log(`File "${fileName}" does not exist in the bucket.`);
      return false;
    }
  } catch (err) {
    console.error('Error checking file existence:', err.message);
    throw err;
  }
}

// Define the `addProduct` endpoint
router.post('/', async (req, res) => {
  const { filePath, fileName, bucketName } = req.body;

  if (!filePath || !fileName || !bucketName) {
    return res.status(400).json({ error: 'Missing required parameters: filePath, fileName, or bucketName.' });
  }

  try {
    // Upload file
    const uploadResponse = await uploadFile(bucketName, filePath, fileName);

    // Check if file exists in the bucket
    const fileExistsResponse = await fileExists(bucketName, fileName);

    res.status(200).json({
      message: 'File uploaded successfully.',
      uploadResponse,
      fileExists: fileExistsResponse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;