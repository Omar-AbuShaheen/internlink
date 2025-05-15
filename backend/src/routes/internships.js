const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { auth, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createInternship,
  getInternships,
  getInternship,
  updateInternship,
  deleteInternship,
  applyForInternship,
  updateApplicationStatus
} = require('../controllers/internshipController');

// @route   POST api/internships
// @desc    Create internship
// @access  Private (Company)
router.post(
  '/',
  [
    auth,
    checkRole(['company']),
    upload.single('logo'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('type', 'Type is required').isIn(['full-time', 'part-time', 'remote', 'hybrid']),
      check('duration', 'Duration is required').not().isEmpty(),
      check('salary', 'Salary is required').not().isEmpty(),
      check('deadline', 'Deadline is required').isISO8601()
    ]
  ],
  createInternship
);

// @route   GET api/internships
// @desc    Get all internships
// @access  Public
router.get('/', getInternships);

// @route   GET api/internships/:id
// @desc    Get internship by ID
// @access  Public
router.get('/:id', getInternship);

// @route   PUT api/internships/:id
// @desc    Update internship
// @access  Private (Company)
router.put(
  '/:id',
  [
    auth,
    checkRole(['company']),
    upload.single('logo'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('type', 'Type is required').isIn(['full-time', 'part-time', 'remote', 'hybrid']),
      check('duration', 'Duration is required').not().isEmpty(),
      check('salary', 'Salary is required').not().isEmpty(),
      check('deadline', 'Deadline is required').isISO8601()
    ]
  ],
  updateInternship
);

// @route   DELETE api/internships/:id
// @desc    Delete internship
// @access  Private (Company)
router.delete('/:id', [auth, checkRole(['company'])], deleteInternship);

// @route   POST api/internships/:id/apply
// @desc    Apply for internship
// @access  Private (Student)
router.post(
  '/:id/apply',
  [
    auth,
    checkRole(['student']),
    upload.fields([
      { name: 'resume', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 }
    ]),
    [
      check('resume', 'Resume is required').not().isEmpty(),
      check('coverLetter', 'Cover letter is required').not().isEmpty()
    ]
  ],
  applyForInternship
);

// @route   PUT api/internships/:internshipId/applications/:applicationId
// @desc    Update application status
// @access  Private (Company)
router.put(
  '/:internshipId/applications/:applicationId',
  [
    auth,
    checkRole(['company']),
    [
      check('status', 'Status is required').isIn(['pending', 'reviewed', 'accepted', 'rejected'])
    ]
  ],
  updateApplicationStatus
);

module.exports = router; 