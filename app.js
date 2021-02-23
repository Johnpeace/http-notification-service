import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import '@babel/polyfill';

import AppError from './src/utils/app-error';
import globalError from './src/utils/global-error';
import Route from './src/route';

const app = express();

const { NODE_ENV } = process.env;
NODE_ENV !== 'production'
  ? app.use(morgan('dev'))
  : app.use(morgan('combined'));

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const router = express.Router();
app.use('/', Route(router));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalError);

export default app;
