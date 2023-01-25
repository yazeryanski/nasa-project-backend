import express from 'express';
import cors from 'cors';

import router__common from 'routes/common.routes';
import router__planets from 'routes/planets/planets.routes';
import router__launches from 'routes/launches/launches.routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('static'));

app.use(router__common);
app.use('/planets', router__planets);
app.use('/launches', router__launches);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'index.html')))

export default app;
