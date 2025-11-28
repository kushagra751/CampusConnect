import express from 'express';
import dotenv from 'dotenv';
import {UserRoute} from './routes/authentication/userRoutes.routes.js'; 
import {adminRoutes} from './routes/authentication/adminRoutes.routes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from "socket.io";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

const app = express();
const server = createServer(app);
const io = new Server(server);

// socket handlers

app.use(cors()); // Enable CORS

app.use(express.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 3000;

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
 
app.use('/user/', UserRoute);         // Base route for user    
app.use('/admin/', adminRoutes);      // Admin-specific routes  

// Use server.listen() instead of app.listen() to support Socket.IO
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
