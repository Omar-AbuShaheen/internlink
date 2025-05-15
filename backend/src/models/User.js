const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'company', 'admin'],
    required: true
  },
  profile: {
    name: String,
    bio: String,
    location: String,
    website: String,
    avatar: String
  },
  // Additional fields based on role
  studentProfile: {
    education: [{
      school: String,
      degree: String,
      field: String,
      graduationYear: Number
    }],
    skills: [String],
    resume: String
  },
  companyProfile: {
    companyName: String,
    industry: String,
    size: String,
    description: String,
    logo: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User; 