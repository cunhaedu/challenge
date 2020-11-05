import express from 'express';
import './typeorm';
import cors from 'cors';
import routes from './routes';

import errorsHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorsHandler);

export default app;
