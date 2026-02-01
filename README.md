# Unified Service Management Portal - Student ERP

> Complete student service management system built with React 18, Node.js/Express, Firebase, and Tailwind CSS during a hackathon sprint.

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🎯 Project Overview

A comprehensive platform enabling students to submit service requests (hostel changes, fee waivers, document issuance, etc.) and admins to process, track, and manage them in real-time.

**Build Status:** ✅ 15 commits complete | **Bundle:** 565KB JS | **Code Split:** 16 chunks

## ✨ Features

### 🎓 Student Portal
- User Authentication (Email/Password + Google OAuth)
- Dashboard with real-time statistics
- Create & Track Service Requests (8 service types)
- Advanced Search & Filtering
- Real-time Notifications
- Service Feedback & Ratings System
- Profile Management
- Course & Grade Tracking
- Payment History
- Course Electives Selection

### 👨‍💼 Admin Portal
- Comprehensive Dashboard with KPIs
- Request Queue Management
- Process Requests (status updates, notes)
- User Management & Deactivation
- System Analytics & Trends
- Report Generation (PDF/CSV)
- Real-time Status Updates via Socket.io
- Batch Email Notifications

### ⚡ Technical Features
- Socket.io Real-time Notifications
- Email Notification API (ready for SendGrid/Nodemailer)
- Protected Routes & Role-based Access
- Responsive Mobile Design (mobile-first)
- Code Splitting & Lazy Loading
- Performance Optimization (debounce, memoization, caching)
- Firebase Authentication
- Mock Data System (easily switchable to Firestore)

---

## 🛠 Tech Stack

### Frontend
- **React 18** + React Router v6
- **Vite 5.0** (blazing fast builds)
- **Tailwind CSS 3.4**
- **Socket.io-client 4.7**
- **Firebase SDK**

### Backend
- **Node.js** + **Express 4.18**
- **Socket.io 4.7**
- **Firebase Admin SDK**
- **Helmet, CORS, Morgan** middleware

### Infrastructure
- **Frontend:** Vercel
- **Backend:** Railway
- **Auth:** Firebase
- **Database:** Firestore (configured, uses localStorage for now)

---

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| JavaScript Bundle | 565 KB (minified) |
| CSS Bundle | 26.5 KB (minified) |
| Code Split Chunks | 16 files |
| Modules Bundled | 112 |
| Lazy-loaded Routes | 15 pages |
| Initial Load Time | ~3.2s |

---

## 📁 Project Structure

```
Dr.meghnaad_Saha/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── CreateRequest.jsx
│   │   │   │   ├── MyRequests.jsx
│   │   │   │   ├── RequestDetails.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── Courses.jsx
│   │   │   │   ├── Payments.jsx
│   │   │   │   ├── Electives.jsx
│   │   │   │   ├── Notifications.jsx
│   │   │   │   └── Feedback.jsx (all lazy-loaded)
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── AllRequests.jsx
│   │   │       ├── RequestDetails.jsx
│   │   │       ├── Users.jsx
│   │   │       ├── Analytics.jsx
│   │   │       └── Reports.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── routes/
│   │   │   └── index.jsx (with code splitting)
│   │   ├── services/
│   │   │   ├── mockData.js
│   │   │   └── socketService.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── responsive.css
│   │   │   └── forms.css
│   │   └── utils/
│   │       └── performance.js
│   ├── vite.config.js
│   └── package.json
└── backend/
    ├── src/
    │   ├── routes/
    │   │   ├── requests.js
    │   │   ├── admin.js
    │   │   └── notifications.js
    │   ├── middleware/
    │   │   └── auth.js
    │   └── app.js
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project setup

### Installation

**Clone and Setup:**
```bash
git clone <repo-url>
cd Dr.meghnaad_Saha
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev      # Dev server: http://localhost:5173
npm run build    # Production build
```

**Backend Setup:**
```bash
cd backend
npm install
npm run dev      # Dev server: http://localhost:5000
```

### 🔑 Environment Configuration

**Frontend (.env.local):**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_API_BASE_URL=http://localhost:5000
```

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
CORS_ORIGIN=http://localhost:5173
```

---

## 🎯 Git Commit Timeline

| # | Commit | Features | Files |
|---|--------|----------|-------|
| 0 | Scaffolding | React + Express setup, Firebase config | 23 |
| 1 | Authentication | Login/Register, Google OAuth, AuthContext | 8 |
| 2 | Service Requests | Create form, My Requests, Details page | 7 |
| 3 | Admin Management | Request queue, status updates, admin notes | 2 |
| 4 | Backend Routes | API endpoints, middleware, Socket.io setup | 4 |
| 5 | Student Features | Profile, Courses, Payments, Electives | 4 |
| 6 | Notifications | Notifications page, Admin users, Analytics | 3 |
| 7 | Real-time Updates | Socket.io integration, event emitters | 2 |
| 8 | Reports & Export | PDF/CSV report generation interface | 1 |
| 9 | Enhanced Dashboard | Quick action cards, UI improvements | 1 |
| 10 | Feedback System | Star ratings, service surveys | 2 |
| 11 | Search & Filter | Advanced search, sorting, filtering | 1 |
| 12 | Email Notifications | Email API, batch notifications | 2 |
| 13 | Mobile Responsive | Media queries, touch-friendly UI | 2 |
| 14 | Performance Opt. | Code splitting, lazy loading, caching | 2 |
| 15 | Documentation | README & deployment config | 1 |

---

## 🔌 API Endpoints

### Student Routes (`/api/requests`)
```
GET    /my-requests       Get user's service requests
POST   /create            Create new service request
GET    /:id               Get request details
PUT    /:id               Update request status/notes
```

### Admin Routes (`/api/admin`)
```
GET    /requests          Get all requests with filters
PUT    /requests/:id/status   Update request status
GET    /stats             Get dashboard statistics
```

### Notification Routes (`/api/notifications`)
```
POST   /send-email        Send email notification
POST   /notify-status-change   Notify on status change
POST   /send-batch        Send batch notifications
```

---

## 🔐 Security

- ✅ Firebase token verification
- ✅ Role-based access control (student/admin)
- ✅ Email domain verification for admin access
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Protected routes with AuthContext
- ✅ Secure session handling

---

## 🧪 Testing Users

**Student Account:**
- Email: `student@college.edu`
- Password: `Test@123`

**Admin Account:**
- Email: `admin@college.edu`
- Password: `Admin@123`

---

## 📈 Usage Statistics

- **8 Service Types:** Hostel Change, Fee Waiver, Document Issue, Leave Request, Course Change, Transcript, Grievance, Other
- **4 Priority Levels:** Low, Medium, High, Urgent
- **5 Status States:** Pending, In Progress, Completed, Rejected, On Hold
- **16 Routes:** 11 student pages, 5 admin pages (all lazy-loaded)
- **100+ Components:** Reusable UI components throughout

---

## 🌐 Deployment Guide

### Deploy Frontend to Vercel

```bash
cd frontend
npm run build
# Connect to Vercel and deploy
vercel deploy
```

### Deploy Backend to Railway

```bash
# Setup Railway project
railway link
railway up

# Or push to GitHub and auto-deploy
```

---

## 📝 Notable Implementation Details

1. **Code Splitting:** Routes lazy-loaded with React.lazy() + Suspense
2. **Real-time Updates:** Socket.io bidirectional communication
3. **Performance:** Debounce search, memoization, local caching
4. **Responsive:** Mobile-first design with 4 media query breakpoints
5. **Auth:** Firebase with custom token verification middleware
6. **Data:** Mock localStorage system, Firestore integration prepared

---

## 🚧 Future Enhancements

- [ ] Firestore integration (replace localStorage)
- [ ] Email service (SendGrid/Nodemailer)
- [ ] S3 file uploads
- [ ] Advanced analytics graphs
- [ ] Admin batch notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Video tutorials
- [ ] Load testing & optimization

---

## 🐛 Troubleshooting

**Port 5000/5173 already in use:**
```bash
# Frontend
npm run dev -- --port 3000

# Backend
PORT=3001 npm run dev
```

**Firebase auth errors:**
- Verify .env variables
- Check Firebase console for API key restrictions
- Ensure CORS origin is whitelisted

**Socket.io connection failed:**
- Verify backend is running
- Check CORS_ORIGIN in backend .env
- Ensure socket service is properly imported

---

## 📞 Support

- 📚 Check API documentation in routes/
- 🐙 Review GitHub issues
- 💬 Contact development team

---

## 📄 License

Built during a hackathon sprint. Educational use only.

## 🙏 Credits

- **UI Template:** DayNight Admin theme inspiration
- **Icons:** Lucide React
- **Backend:** Express.js & Socket.io communities
- **Firebase:** Google Cloud Platform

---

**Built with ❤️ in a 15-commit hackathon sprint** ⚡

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

