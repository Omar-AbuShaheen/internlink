# InternLink - Internship Management Platform

InternLink is a comprehensive platform that connects students with companies for internship opportunities. It streamlines the internship application process and provides tools for both students and companies to manage their internship programs effectively.

## 🌟 Features

### For Students
- Browse and search internship opportunities
- Apply to internships with resume and cover letter
- Track application status
- Manage profile and portfolio
- Receive notifications for application updates

### For Companies
- Post and manage internship listings
- Review and process applications
- Manage candidate pipeline
- Company profile management
- Analytics dashboard

### For Administrators
- User management
- Content moderation
- Platform analytics
- System configuration

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- React Router
- Axios
- Redux (for state management)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose ODM

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/internlink.git
cd internlink
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

4. Environment Setup
   - Create `.env` file in backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/internlink
   JWT_SECRET=your_jwt_secret_key_here
   ```
   - Create `.env` file in frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start Development Servers
   - Backend:
   ```bash
   cd backend
   npm run dev
   ```
   - Frontend:
   ```bash
   cd frontend
   npm start
   ```

## 📁 Project Structure

```
internlink/
├── frontend/                # React frontend
│   ├── public/             # Static files
│   └── src/               # Source files
│       ├── components/    # React components
│       ├── pages/        # Page components
│       ├── services/     # API services
│       ├── utils/        # Utility functions
│       └── styles/       # CSS files
│
└── backend/               # Node.js backend
    ├── src/
    │   ├── config/      # Configuration files
    │   ├── controllers/ # Route controllers
    │   ├── middleware/  # Custom middleware
    │   ├── models/      # Database models
    │   └── routes/      # API routes
    └── uploads/         # File uploads
```

## 🔒 Security Features
- JWT Authentication
- Password Hashing
- Input Validation
- CORS Protection
- Rate Limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the need for better internship management systems
