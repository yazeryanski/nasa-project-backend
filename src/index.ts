import http from 'http';
import dotenv from 'dotenv';

import app from 'app';
import { loadPlanets } from 'models/planets/planets.model';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await loadPlanets();
    server.listen(PORT, () => console.log('Running on the port: ', PORT));
  } catch (error) {
    console.log('ERROR:', error);
    console.log('SERVER IS DOWN');
  }
})();
