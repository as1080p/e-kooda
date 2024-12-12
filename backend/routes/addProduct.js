// Import the Supabase client library
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const supabaseUrl = 'https://kyujqtzadjlebzwdrjql.supabase.co';
const supabaseKey =process.env.SUPABASE_KEY; // Use the service role key for server-side code


const supabase = createClient(supabaseUrl, supabaseKey);
async function checkStorageBucket() {
    try {
      // List files in the specified bucket
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
      // Read the file from the local file system
      const file = fs.readFileSync(filePath);
  
  
      // Upload the file to Supabase Storage
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .upload(`products/${fileName}`, file, {
          contentType: 'image/jpeg', // Change based on the image type (e.g., 'image/png')
          upsert: true, // Set to true to overwrite the file if it already exists
        });
  
  
      if (error) {
        throw new Error(`File upload failed: ${error.message}`);
      }
  
  
      console.log('File uploaded successfully:', data);
      return data;
    } catch (err) {
      console.error('Error during file upload:', err.message);
    }
  }
  
  
  // Function to check if a file exists in the bucket
  async function checkFileInBucket(bucketName, filePath) {
    try {
      // Get the file information from the storage bucket
      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);
  
  
      if (error) {
        throw new Error(`Error fetching file info: ${error.message}`);
      }
  
  
      console.log('File public URL:', data.publicURL);
    } catch (err) {
      console.error('Error checking file in bucket:', err.message);
    }
  }
  
  
  // Replace with your local image file path and name
  const imagePath = 'C:\\Users\\HP\\Downloads\\flower.jpg'; // Correct the path to your local image
  const imageName = 'image.jpg'; // Replace with your image name
  const bucketName = 'products'; // Replace with your bucket name
  
  
  // Upload the file and then check if it exists in the bucket
  (async () => {
    const uploadedFileData = await uploadFile(bucketName, imagePath, imageName);
    if (uploadedFileData) {
      await checkFileInBucket(bucketName, `products/${imageName}`);
    }
  })();
  
  // Run the check
  checkStorageBucket();
  