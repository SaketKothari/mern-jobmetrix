import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

// routers
import jobRouter from './routes/jobRouter.js';

// midddleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/v1/jobs', jobRouter);

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
