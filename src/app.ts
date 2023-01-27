import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

// Middlewares
import { errorHandler } from 'middlewares/errorHandler.middleware';

// Routers
import router__common from 'routes/common.routes';
import router__planets from 'routes/planets/planets.routes';
import router__launches from 'routes/launches/launches.routes';

const app = express();

//Middlewares 
app.use(cors());
app.use(express.json());
app.use(morgan('common'));

app.use(express.static('static'));

// Routes
app.use(router__common);
app.use('/planets', router__planets);
app.use('/launches', router__launches);
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'))
);

// ErrorHandler
app.use(errorHandler);

export default app;
