# Unified Service Management Portal

> A comprehensive student ERP platform that streamlines academic service requests through an integrated ticket-based system.

[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📖 About

The Unified Service Management Portal consolidates all student academic services (course registration, exam management, transcripts, certificates, etc.) into a single, user-friendly ticket-based system. Students can submit requests, track progress in real-time, and view their request history, while administrators efficiently manage and process requests with built-in analytics and notifications.

### ✨ Key Features

- 🎫 **Ticket-Based System** - Submit and track service requests with unique ticket IDs
- 👥 **Role-Based Access** - Separate dashboards for students, admins, and super admins
- 🔄 **Real-Time Updates** - Live status updates using Socket.io
- 📊 **Analytics Dashboard** - Visual insights with charts and statistics
- 🔍 **Advanced Search** - Filter and search requests by multiple criteria
- 📧 **Email Notifications** - Automated updates on request status changes
- 📎 **File Attachments** - Upload and download supporting documents
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4
- **Real-Time:** Socket.io
- **Email:** Nodemailer
- **Validation:** Joi
- **Security:** Helmet, CORS

### Database & Services
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth (Email & Google)
- **Storage:** Firebase Storage
- **Hosting:** Vercel (Frontend) + Railway (Backend)

---

## 📁 Project Structure

```
Dr.meghnaad_Saha/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── common/      # Reusable UI components
│   │   │   ├── student/     # Student-specific features
│   │   │   ├── admin/       # Admin panel components
│   │   │   └── auth/        # Authentication components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context (state management)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services & Firebase config
│   │   ├── utils/           # Helper functions
│   │   └── styles/          # CSS files
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── services/        # Business logic & Firebase Admin
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Helper functions
│   │   └── templates/       # Email templates
│   ├── tests/               # Unit & integration tests
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Dr.meghnaad_Saha
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

### Configuration

#### Frontend Setup

1. Copy the environment template:
```bash
cd frontend
cp .env.example .env.local
```

2. Add your Firebase credentials to `.env.local`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000/api
```

#### Backend Setup

1. Copy the environment template:
```bash
cd backend
cp .env.example .env
```

2. Add your configuration to `.env`:
```env
NODE_ENV=development
PORT=5000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Security
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

#### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password and Google)
4. Enable **Firestore Database** (start in production mode)
5. Enable **Storage**
6. Download service account key (for backend)
7. Copy web app credentials (for frontend)

### Running the Application

#### Development Mode

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will be available at `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend API will run at `http://localhost:5000`

#### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/profile` | Get user profile |

### Service Request Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/requests` | Get all requests (with filters) |
| GET | `/requests/:id` | Get request by ID |
| POST | `/requests` | Create new request |
| PUT | `/requests/:id` | Update request |
| DELETE | `/requests/:id` | Delete request |
| GET | `/requests/:id/history` | Get request history |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Get dashboard statistics |
| GET | `/admin/requests` | Get all requests (admin view) |
| PUT | `/admin/requests/:id/status` | Update request status |
| GET | `/admin/users` | Get all users |
| PUT | `/admin/users/:id/role` | Update user role |

---

## 🎨 User Roles

### Student
- Submit service requests
- Track request status
- View request history
- Upload supporting documents
- Receive email notifications

### Admin
- View all service requests
- Update request status
- Assign requests
- View dashboard analytics
- Manage user requests

### Super Admin
- All admin permissions
- Manage user roles
- View system analytics
- Configure system settings
- Access audit logs

---

## 🔒 Security

- **Authentication:** Firebase Authentication with JWT
- **Authorization:** Role-based access control (RBAC)
- **Database Rules:** Firestore security rules
- **API Security:** Helmet.js, CORS configuration
- **Input Validation:** Joi validation schemas
- **Data Encryption:** HTTPS/TLS in production
- **Environment Variables:** Sensitive data in .env files

---

## 🧪 Testing

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Integration Tests
```bash
cd backend
npm run test:integration
```

---

## 🚀 Deployment

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard

### Backend (Railway)

1. Install Railway CLI:
```bash
npm install -g railway
```

2. Deploy:
```bash
cd backend
railway login
railway init
railway up
```

3. Set environment variables in Railway dashboard

---

## 📊 Database Schema

### Collections

#### users
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  role: 'student' | 'admin' | 'superadmin',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### serviceRequests
```javascript
{
  id: string,
  ticketId: string,
  userId: string,
  serviceType: string,
  description: string,
  status: 'pending' | 'in-progress' | 'completed' | 'rejected',
  priority: 'low' | 'medium' | 'high',
  attachments: array,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### requestUpdates
```javascript
{
  requestId: string,
  status: string,
  comment: string,
  updatedBy: string,
  timestamp: timestamp
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- Prajyot - Initial work

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Tailwind CSS for styling utilities
- All contributors and supporters

---

## 📧 Contact

- Email:prajyot1093@gmail.com
- Project Link: https://github.com/prajyot1093/Dr.meghnaad_Saha

---

**Made with ❤️ for Dr. Meghnad Saha Institute**

