import dotenv from 'dotenv';
import app from 'app';
import http from 'http';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Running on the port: ', PORT);
});
