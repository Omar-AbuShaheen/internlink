const Internship = require('../models/Internship');
const { validationResult } = require('express-validator');

// Create new internship
exports.createInternship = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const internship = new Internship({
      ...req.body,
      company: req.user._id
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all internships with filters
exports.getInternships = async (req, res) => {
  try {
    const { 
      search, 
      type, 
      location, 
      status = 'open',
      page = 1,
      limit = 10
    } = req.query;

    const query = { status };
    
    if (search) {
      query.$text = { $search: search };
    }
    if (type) query.type = type;
    if (location) query.location = location;

    const internships = await Internship.find(query)
      .populate('company', 'profile.companyName profile.logo')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Internship.countDocuments(query);

    res.json({
      internships,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single internship
exports.getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate('company', 'profile.companyName profile.logo profile.description')
      .populate('applications.student', 'profile.name studentProfile');

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedInternship);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await internship.remove();
    res.json({ message: 'Internship removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply for internship
exports.applyForInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.status !== 'open') {
      return res.status(400).json({ message: 'Internship is not accepting applications' });
    }

    // Check if already applied
    const alreadyApplied = internship.applications.some(
      app => app.student.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this internship' });
    }

    internship.applications.push({
      student: req.user._id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    });

    await internship.save();
    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { internshipId, applicationId } = req.params;
    const { status } = req.body;

    const internship = await Internship.findById(internshipId);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const application = internship.applications.id(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await internship.save();

    res.json({ message: 'Application status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 