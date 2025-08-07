require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {

})
.then(() => console.log('Connected to MongoDB: mini_project'))
.catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  age: Number,
});


module.exports = mongoose.model('user', userSchema);
