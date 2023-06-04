const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true ,unique: true},
  numberOfUsers: { type: Number, required: true },
  maxAllowedUsers: { type: Number, required: true },
  companyId: { type: String , required: true,unique: true },
  users: { type: Array, default: [] }, // Define the users property as an array
});
module.exports = mongoose.model('Company', companySchema);