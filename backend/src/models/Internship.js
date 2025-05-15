const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  responsibilities: [String],
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'hybrid'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  skills: [String],
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  applications: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    resume: String,
    coverLetter: String
  }],
  deadline: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Index for search functionality
internshipSchema.index({ title: 'text', description: 'text', skills: 'text' });

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship; 