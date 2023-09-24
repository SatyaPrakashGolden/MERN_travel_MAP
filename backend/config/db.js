const mongoose = require('mongoose');
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/TravelMap';
async function connectDB() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB succeffully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = connectDB;
