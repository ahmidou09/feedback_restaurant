# Restaurant Feedback App

A comprehensive full-stack application for collecting and managing restaurant feedback via QR codes.

## 🌟 Features

- **Guest Interface:**
  - Scan QR code to access feedback form
  - Rate food, service, and cleanliness
  - Report specific problems
  - Mobile-friendly design

- **Admin Dashboard:**
  - Real-time statistics and analytics
  - Heatmap of reported problems by table
  - Manage tables and generate QR codes
  - Secure authentication

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Styled Components, Chart.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Database:** MongoDB Atlas

## 📂 Project Structure

\`\`\`
/feedback_restaurant
  ├── frontend/         # React client application
  └── backend/          # Node.js Express server
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB connection string

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone git@github.com:ahmidou09/feedback_restaurant.git
    cd feedback_restaurant
    \`\`\`

2.  **Setup Backend:**
    \`\`\`bash
    cd backend
    npm install
    cp .env.example .env
    # Update .env with your MONGO_URI
    npm run dev
    \`\`\`

3.  **Setup Frontend:**
    \`\`\`bash
    cd ../frontend
    npm install
    cp .env.example .env
    npm run dev
    \`\`\`

## 📝 Environment Variables

See \`backend/.env.example\` and \`frontend/.env.example\` for required variables.

### Backend
- \`MONGO_URI\`: MongoDB connection string
- \`PORT\`: Server port (default: 5000)
- \`CORS_ORIGIN\`: Allowed frontend origin(s)

### Frontend
- \`VITE_API_URL\`: URL of the backend API

## 🔮 Future Roadmap

- [ ] Email notifications for critical issues
- [ ] Multiple restaurant/branch support
- [ ] Loyalty program integration

## 📄 License

This project is licensed under the MIT License.
