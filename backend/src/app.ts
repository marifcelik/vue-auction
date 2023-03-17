import express from 'express';
import session from 'express-session';
import pino from './utils/logger';
import router from './routers';
import { redisStore } from './utils/db';
import { COOKIE_NAME, SECRET } from './config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pino);
app.use(
  session({
    store: redisStore,
    name: COOKIE_NAME,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: SECRET,
    cookie: { maxAge: 1000 * 20 }
  })
);

app.use(router);

app.get('/', (_req, res) => {
  res.send('kartaca cekirdekten yetisenler case');
});

export default app;