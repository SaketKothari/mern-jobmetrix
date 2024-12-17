import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import express from 'express';

const app = express();

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

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
