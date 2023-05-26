const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true
  },
  staffName: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

// Pre-save hook to generate a unique staff ID
StaffSchema.pre('save', function (next) {
  if (!this.staffId) {
    const prefix = 'S';
    const randomNumber = Math.floor(100 + Math.random() * 900);
    this.staffId = `${prefix}${randomNumber}`;
  }
  next();
});

module.exports = mongoose.model('Staff', StaffSchema);
