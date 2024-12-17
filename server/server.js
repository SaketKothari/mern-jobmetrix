import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import express from 'express';
import { nanoid } from 'nanoid';

const app = express();

let jobs = [
  { id: nanoid(), company: 'apple', position: 'frontend' },
  { id: nanoid(), company: 'google', position: 'backend' },
];

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/', (req, res) => {
  // console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
