# PCHC Backend API 🚀

Production-ready, secure, and CMS-ready backend for the Pallotti Children Hope Center (PCHC).

## Tech Stack
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **Media Storage:** Cloudinary
- **Auth:** JWT + bcrypt
- **Security:** Helmet, Rate Limiting, CORS, express-validator
- **Performance:** Compression, Morgan/Winston logging, Unified Homepage API

## Getting Started

### 1. Prerequisites
- Node.js 20+
- PostgreSQL (or Neon DB)
- Cloudinary Account

### 2. Environment Variables
Create a `.env` file based on `.env.example`:
```env
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
```

### 3. Installation
```bash
cd backend
npm install
```

### 4. Database Setup
Run the SQL queries in `schema.sql` against your PostgreSQL database.

### 5. Development
```bash
npm run dev
```

### 6. Production Build
```bash
npm run build
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/login` - Admin login

### Blog System
- `GET /api/blogs` - Get all posts
- `GET /api/blogs/:id` - Get single post with comments
- `POST /api/blogs` - Create post (Admin)
- `PUT /api/blogs/:id` - Update post (Admin)
- `DELETE /api/blogs/:id` - Delete post (Admin)

### Homepage CMS
- `GET /api/content/homepage` - Unified endpoint for all sections
- `GET /api/content/:section` - Get specific section
- `PUT /api/content/:section` - Update section content (Admin)

### Other Modules
- `GALLERY:` `/api/gallery`
- `TEAM:` `/api/team`
- `CONTACT:` `/api/contact`
- `DONATION:` `/api/donations`
- `UPLOAD:` `/api/upload` (Admin)

## Security
- All admin routes are protected by JWT middleware.
- Input validation on all state-changing operations.
- Rate limiting to prevent brute-force and DDoS.
- Helmet for secure HTTP headers.
