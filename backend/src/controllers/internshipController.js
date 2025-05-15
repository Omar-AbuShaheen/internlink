const { validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

// Create new internship
exports.createInternship = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // TODO: Replace with PostgreSQL query
    // const result = await db.query(
    //   'INSERT INTO internships (title, company_id, description, requirements, responsibilities, location, type, duration, salary, skills, status, deadline) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    //   [req.body.title, req.user.id, req.body.description, req.body.requirements, req.body.responsibilities, req.body.location, req.body.type, req.body.duration, req.body.salary, req.body.skills, 'open', req.body.deadline]
    // );

    res.status(201).json({
      message: 'Create internship endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
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

    // TODO: Replace with PostgreSQL query
    // const offset = (page - 1) * limit;
    // const result = await db.query(
    //   'SELECT i.*, c.company_name, c.logo FROM internships i JOIN companies c ON i.company_id = c.id WHERE i.status = $1 AND ($2::text IS NULL OR i.title ILIKE $2) AND ($3::text IS NULL OR i.type = $3) AND ($4::text IS NULL OR i.location = $4) ORDER BY i.created_at DESC LIMIT $5 OFFSET $6',
    //   [status, search ? `%${search}%` : null, type, location, limit, offset]
    // );

    res.json({
      message: 'Get internships endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single internship
exports.getInternship = async (req, res) => {
  try {
    // TODO: Replace with PostgreSQL query
    // const result = await db.query('SELECT * FROM internships WHERE id = $1', [req.params.id]);
    // if (!result.rows.length) {
    //   return res.status(404).json({ message: 'Internship not found' });
    // }

    res.json({
      message: 'Get single internship endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update internship
exports.updateInternship = async (req, res) => {
  try {
    // TODO: Replace with PostgreSQL query
    // const result = await db.query('SELECT * FROM internships WHERE id = $1', [req.params.id]);
    // if (!result.rows.length) {
    //   return res.status(404).json({ message: 'Internship not found' });
    // }

    // if (result.rows[0].company_id !== req.user.id) {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }

    // If new logo is uploaded, delete old one
    // if (req.file && result.rows[0].logo) {
    //   const oldLogoPath = path.join(__dirname, '../../', result.rows[0].logo);
    //   await fs.unlink(oldLogoPath).catch(console.error);
    // }

    // const updatedInternship = await db.query(
    //   'UPDATE internships SET title = $1, description = $2, requirements = $3, responsibilities = $4, location = $5, type = $6, duration = $7, salary = $8, skills = $9, status = $10, deadline = $11, logo = $12 WHERE id = $13 RETURNING *',
    //   [
    //     req.body.title,
    //     req.body.description,
    //     req.body.requirements,
    //     req.body.responsibilities,
    //     req.body.location,
    //     req.body.type,
    //     req.body.duration,
    //     req.body.salary,
    //     req.body.skills,
    //     req.body.status,
    //     req.body.deadline,
    //     req.file ? `/uploads/logos/${req.file.filename}` : result.rows[0].logo,
    //     req.params.id
    //   ]
    // );

    res.json({
      message: 'Update internship endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete internship
exports.deleteInternship = async (req, res) => {
  try {
    // TODO: Replace with PostgreSQL query
    // const result = await db.query('SELECT * FROM internships WHERE id = $1', [req.params.id]);
    // if (!result.rows.length) {
    //   return res.status(404).json({ message: 'Internship not found' });
    // }

    // if (result.rows[0].company_id !== req.user.id) {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }

    // Delete logo file
    // if (result.rows[0].logo) {
    //   const logoPath = path.join(__dirname, '../../', result.rows[0].logo);
    //   await fs.unlink(logoPath).catch(console.error);
    // }

    // Delete application files
    // const applicationResult = await db.query('SELECT * FROM applications WHERE internship_id = $1', [req.params.id]);
    // for (const application of applicationResult.rows) {
    //   if (application.resume) {
    //     const resumePath = path.join(__dirname, '../../', application.resume);
    //     await fs.unlink(resumePath).catch(console.error);
    //   }
    //   if (application.cover_letter) {
    //     const coverLetterPath = path.join(__dirname, '../../', application.cover_letter);
    //     await fs.unlink(coverLetterPath).catch(console.error);
    //   }
    // }

    res.json({
      message: 'Delete internship endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply for internship
exports.applyForInternship = async (req, res) => {
  try {
    // TODO: Replace with PostgreSQL queries
    // Check if internship exists and is open
    // const result = await db.query('SELECT * FROM internships WHERE id = $1', [req.params.id]);
    // if (!result.rows.length) {
    //   return res.status(404).json({ message: 'Internship not found' });
    // }

    // if (result.rows[0].status !== 'open') {
    //   return res.status(400).json({ message: 'Internship is not accepting applications' });
    // }

    // Check if already applied
    // const existingApplicationResult = await db.query(
    //   'SELECT * FROM applications WHERE internship_id = $1 AND student_id = $2',
    //   [req.params.id, req.user.id]
    // );

    // if (existingApplicationResult.rows.length > 0) {
    //   return res.status(400).json({ message: 'Already applied for this internship' });
    // }

    // Create application
    // await db.query(
    //   'INSERT INTO applications (internship_id, student_id, resume, cover_letter) VALUES ($1, $2, $3, $4)',
    //   [
    //     req.params.id,
    //     req.user.id,
    //     req.files.resume ? `/uploads/resumes/${req.files.resume[0].filename}` : null,
    //     req.files.coverLetter ? `/uploads/others/${req.files.coverLetter[0].filename}` : null
    //   ]
    // );

    res.json({ message: 'Apply for internship endpoint - TODO: Implement PostgreSQL' });
  } catch (error) {
    if (req.files) {
      for (const field in req.files) {
        for (const file of req.files[field]) {
          await fs.unlink(file.path).catch(console.error);
        }
      }
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    // TODO: Replace with PostgreSQL query
    // const result = await db.query('SELECT * FROM applications WHERE id = $1', [req.params.applicationId]);
    // if (!result.rows.length) {
    //   return res.status(404).json({ message: 'Application not found' });
    // }

    // if (result.rows[0].student_id !== req.user.id) {
    //   return res.status(403).json({ message: 'Not authorized' });
    // }

    // const updatedApplication = await db.query(
    //   'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
    //   [req.body.status, req.params.applicationId]
    // );

    res.json({
      message: 'Update application status endpoint - TODO: Implement PostgreSQL'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 