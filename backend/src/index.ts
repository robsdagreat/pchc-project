import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/error.middleware.js';
import logger from './utils/logger.js';
import { testConnection } from './config/db.js';



const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:", "*"], // Extremely permissive for debugging
      connectSrc: ["'self'", "https:", "http:", "*"],
    },
  },
}));
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Performance
app.use(compression());

// Logging
const morganFormat = (tokens: any, req: any, res: any) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res) + 'ms'
  ].join(' ');
};

app.use(morgan(morganFormat, { 
  stream: { 
    write: (message) => {
      const parts = message.trim().split(' ');
      const method = parts.shift();
      logger.info(parts.join(' '), { label: method });
    }
  } 
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Routes
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import teamRoutes from './routes/team.routes.js';
import contactRoutes from './routes/contact.routes.js';
import donationRoutes from './routes/donation.routes.js';
import contentRoutes from './routes/content.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import userRoutes from './routes/user.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).send('PCHC Project API is running');
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Error Handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, async () => {
    logger.info('Server started');
    logger.info(`Port: ${PORT}`);
    await testConnection();
  }).on('error', (err) => {
    logger.error(`SERVER ERROR: ${err}`);
    process.exit(1);
  });
}

export default app;
