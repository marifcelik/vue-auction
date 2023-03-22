import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import cors from 'cors';
import pino from './utils/logger';
import router from './routers/router';
import { redisStore } from './utils/db';
import { COOKIE_MAXAGE, COOKIE_NAME, SECRET } from './config';

const app = express();
const sessionParser = session({
  store: redisStore,
  name: COOKIE_NAME,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: SECRET,
  cookie: { maxAge: COOKIE_MAXAGE, sameSite: 'strict', httpOnly: false, secure: false }
});

// TODO: integrate swagger
// import('swagger-ui-express')
// .then(async (swagger) => {
//   const swaggerDocument =
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino);
app.use(sessionParser);
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(router);

app.get('/', (_req, res) => {
  res.send('kartaca cekirdekten yetisenler case');
});

export { sessionParser };
export default createServer(app);

// for req.session.user issue
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
