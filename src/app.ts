import express from 'express';
import cors from 'cors';
import router__common from 'routes/common.routes';
import router__planets from 'routes/planets/planets.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router__common);
app.use('/planets', router__planets);

export default app;
