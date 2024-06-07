const mongoose = require('mongoose');

//connect to profiles database
const connectToDatabase = async () => {
  try {
    const dbUrl = 'mongodb://localhost:27017/profilesdb'; 
    const connection = await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectToDatabase;