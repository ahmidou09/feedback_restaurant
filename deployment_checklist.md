# Deployment Checklist

## ✅ Pre-Deployment
- [ ] **Database**: MongoDB Atlas cluster is set up and IP whitelist includes production server IP (or 0.0.0.0/0).
- [ ] **Environment Variables**:
    - [ ] `MONGO_URI` set in backend.
    - [ ] `JWT_SECRET` is a strong, random string.
    - [ ] `CORS_ORIGIN` matches the frontend production URL.
    - [ ] `VITE_API_URL` in frontend points to the production backend URL.
- [ ] **Build**:
    - [ ] Frontend builds successfully (`npm run build`).
    - [ ] No strict mode errors or linting warnings.
- [ ] **Security**:
    - [ ] Remove any `console.log` containing sensitive info.
    - [ ] Ensure `NODE_ENV` is set to `production` on the server.

## 🚀 Deployment Steps
1. **Backend**:
    - Deploy to hosting service (e.g., Render, Railway, Heroku).
    - Configure environment variables.
    - Verify health check endpoint (`/api/health`).
2. **Frontend**:
    - Build project (`npm run build`).
    - Deploy static files (from `dist/`) to hosting service (e.g., Vercel, Netlify).
    - Configure `VITE_API_URL` environment variable if building on the server.

## 🔍 Post-Deployment Verification
- [ ] **Connectivity**: Frontend can communicate with Backend (no CORS errors).
- [ ] **Features**:
    - [ ] Submit a test feedback.
    - [ ] Admin login works.
    - [ ] Dashboard charts load.
- [ ] **Performance**: Page load speed is acceptable.
