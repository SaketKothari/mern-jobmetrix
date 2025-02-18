import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';

// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// public
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// midddleware
import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'Test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not found!' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
