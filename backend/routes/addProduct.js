// Import the Supabase client library
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase with service role key
const supabaseUrl = 'https://kyujqtzadjlebzwdrjql.supabase.co';
const serviceKey = process.env.SERVICE_KEY; // Use the service role key for server-side code
const supabase = createClient(supabaseUrl, serviceKey);

// Function to check bucket connectivity
async function checkStorageBucket() {
  try {
    const bucketName = 'products'; // Replace with your bucket name
    const { data, error } = await supabase.storage.from(bucketName).list();

    if (error) {
      throw new Error(`Error accessing storage bucket: ${error.message}`);
    }

    console.log('Connected to the bucket. Files:', data);
  } catch (err) {
    console.error('Error checking bucket connectivity:', err.message);
  }
}

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
  } catch (err) {
    console.error('Error during file upload:', err.message);
  }
}

// Function to check if a file exists in the bucket
async function fileExists(bucketName, filePath) {
  try {
    const { data, error } = await supabase.storage.from(bucketName).list('', {
      search: filePath,
    });

    if (error) {
      throw new Error(`Error checking file existence: ${error.message}`);
    }

    if (data.length > 0) {
      console.log(`File "${filePath}" exists in the bucket.`);
    } else {
      console.log(`File "${filePath}" does not exist in the bucket.`);
    }
  } catch (err) {
    console.error('Error checking file existence:', err.message);
  }
}

// Replace with your local image file path and name
const imagePath = 'C:\\Users\\HP\\Downloads\\flower.jpg'; // Path to your image
const imageName = 'new_image.jpg'; // Image name
const bucketName = 'products'; // Bucket name

// Upload the file and check if it exists
(async () => {
  await uploadFile(bucketName, imagePath, imageName);
  await fileExists(bucketName, imageName);
})();

// Check bucket connectivity
checkStorageBucket();
