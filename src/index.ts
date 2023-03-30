import http from 'http';
import dotenv from 'dotenv';

import app from 'app';
import { setDbConnection } from 'db';
import Planets from 'services/Planets.service';
import SpacexService from 'services/SpaceX/SpaceX.service';
import { HttpRequest } from 'services/HttpRequest.service';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const SPACEX_URL = 'https://api.spacexdata.com/v5/';

(async () => {
  try {
    setDbConnection();
    await new Planets().initPlanets();
    await new SpacexService(new HttpRequest(SPACEX_URL)).synchData()
    server.listen(PORT, () => console.log('Running on the port: ', PORT));
  } catch (error) {
    console.log('ERROR:', error);
    console.log('SERVER IS DOWN');
  }
})();
