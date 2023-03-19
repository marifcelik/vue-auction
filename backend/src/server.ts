import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import pino from './utils/logger';
import router from './routers';
import { redisStore } from './utils/db';
import { COOKIE_NAME, SECRET } from './config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino);
app.use(
  session({
    store: redisStore,
    name: COOKIE_NAME,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: SECRET,
    cookie: { maxAge: 1000 * 30 }
  })
);

app.use(router);

app.get('/', (_req, res) => {
  res.send('kartaca cekirdekten yetisenler case');
});

export default createServer(app);

// for req.session.user issue
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
