# InternLink - Frontend

InternLink is a modern web application designed to connect students with companies offering internship opportunities. This platform streamlines the internship search and application process, making it easier for students to find relevant opportunities and for companies to discover talented candidates.

## 🚀 Technologies Used

- **React.js** (v19.1.0) - A JavaScript library for building user interfaces
- **React Router DOM** (v7.5.3) - For handling navigation and routing
- **Bootstrap** (v5.3.5) & **React Bootstrap** (v2.10.9) - For responsive design and UI components
- **Framer Motion** (v12.18.1) - For smooth animations and transitions
- **JWT Decode** (v4.0.0) - For handling authentication tokens
- **React Icons** (v5.5.0) - For beautiful and consistent icons
- **Font Awesome** - For additional icon options

## ✨ Features

### For Students
- Create and manage student profiles
- Browse available internship opportunities
- Apply for internships with resume upload
- Track application status
- Dashboard with personalized recommendations
- Save favorite internships

### For Companies
- Create and manage company profiles
- Post internship opportunities
- Review and manage applications
- Company dashboard with analytics
- Manage multiple internship listings

### General Features
- Responsive design for all devices
- User authentication and authorization
- Real-time notifications
- Advanced search and filtering
- Interactive UI with smooth animations
- Dark/Light mode support

## 🛠️ Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   ├── context/     # Context providers
│   ├── images/      # Image assets
│   ├── styles/      # CSS styles
│   └── utils/       # Utility functions
```

## 📋 Requirements

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser
- Backend API server running

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd internlink/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with necessary environment variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## 🎨 UI Components

The application includes several reusable components:

- `LoadingSpinner` - For loading states
- `Modal` - For popup dialogs
- `Toast` - For notifications
- `Tabs` - For organized content display
- `Breadcrumb` - For navigation hierarchy
- `Dropdown` - For selection menus

## 🔐 Authentication

- JWT-based authentication
- Protected routes
- Role-based access control
- Persistent login state

## 🎯 Best Practices

- Component-based architecture
- Responsive design principles
- Clean and maintainable code
- Performance optimization
- Accessibility standards
- Error handling
- Form validation

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please email [support@internlink.com](mailto:support@internlink.com)

---

Made with ❤️ by Omar Abu Shaheen