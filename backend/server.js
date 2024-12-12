const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const router = express.Router();


const app = express();
const PORT = process.env.PORT || 5000;

// Other middlewares and routes
app.use(cors());
app.use(express.json());

// Import Routes
const userLogin = require('./routes/userLogin');
const userRegister = require('./routes/userRegister');
const adminLogin = require('./routes/adminLogin');
const addProduct = require('./routes/addProduct');
const pickUpDrop = require('./routes/pickUpDrop');
const rewardPoints = require('./routes/rewardPoints');
const editProfile = require('./routes/editProfile');

// Use Routes
app.use('/userLogin', userLogin);
app.use('/userRegister', userRegister);
//app.use('/adminLogin', adminLogin);
//app.use('/addProduct', addProduct);
//app.use('/pickUpDrop', pickUpDrop);
//app.use('/rewardPoints', rewardPoints);
//app.use('/editProfile', editProfile);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));