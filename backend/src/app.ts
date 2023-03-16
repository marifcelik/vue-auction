import express from 'express';
import session from 'express-session';
import logger from './utils/logger';
import router from './routes';
import { redisStore } from './utils/db';
import { SECRET } from './config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: SECRET
  })
);

app.use(router);

app.get('/', (_req, res) => {
  res.send('kartaca cekirdekten yetisenler case');
});

export default app;
