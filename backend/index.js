import express from 'express';

const app = express();

const PORTT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORTT, () => {
  console.log('Server is running on port 3000');
});