import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import pino from './utils/logger';
import router from './routers/router';
import { redisStore } from './services/db';
import { COOKIE_MAXAGE, COOKIE_NAME, SECRET } from './config';

const __dirname = dirname(fileURLToPath(import.meta.url))
const originList: (string | undefined)[] = ['http://localhost:5173', 'http://192.168.1.11:5173', 'http://localhost:4173', 'http://192.168.1.3']
const sessionParser = session({
  store: redisStore,
  name: COOKIE_NAME,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: SECRET,
  cookie: { maxAge: COOKIE_MAXAGE, sameSite: 'none', httpOnly: false, secure: false }
});
const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || originList.indexOf(origin) !== -1)
      cb(null, origin)
    else
      cb(new Error('not allowed by cors'))
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static(resolve(__dirname, '../public/img')))
app.use(pino);
app.use(sessionParser);

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
