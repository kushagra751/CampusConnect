import express from 'express';
import dotenv from 'dotenv';
import {UserRoute} from './routes/authentication/userRoutes.routes.js'; 
import {adminRoutes} from './routes/authentication/adminRoutes.routes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from "socket.io";

dotenv.config();

for (const key of ['MONGO_URI', 'JWT_SECRET']) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key} (see backend/.env.example)`);
    process.exit(1);
  }
}

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

const app = express();
const server = createServer(app);
const io = new Server(server);

// socket handlers

// CORS: only allow configured origins (comma-separated CORS_ORIGIN), defaulting to local Vite dev servers.
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);
app.use(cors({
  origin: (origin, cb) => (!origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(null, false)),
}));

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use(express.json({ limit: '100kb' })); // Middleware to parse JSON

// Simple in-memory rate limiter for credential / OTP endpoints.
const hits = new Map();
const rateLimit = (max, windowMs) => (req, res, next) => {
  const now = Date.now();
  const key = `${req.ip}:${req.path}`;
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }
  if (++entry.count > max) {
    return res.status(429).json({ success: false, message: 'Too many attempts, please try again later.' });
  }
  next();
};
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
}, 60 * 1000).unref();
for (const path of ['login', 'signup', 'forgetpassword', 'verifyotp', 'resetpassword']) {
  app.use(`/user/${path}`, rateLimit(10, 15 * 60 * 1000));
  app.use(`/admin/${path}`, rateLimit(10, 15 * 60 * 1000));
}

const PORT = process.env.PORT || 3000;

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
 
app.use('/user/', UserRoute);         // Base route for user    
app.use('/admin/', adminRoutes);      // Admin-specific routes  

// Generic error handler (no stack traces / internals leaked to clients)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.status && err.status < 500 ? err.message : 'Server error' });
});

// Use server.listen() instead of app.listen() to support Socket.IO
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
