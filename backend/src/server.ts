import express from 'express';
import session from 'express-session';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import pino from './utils/logger';
import router from './routers/router';
import { redisStore } from './services/db';
import { COOKIE_MAXAGE, COOKIE_NAME, ORIGIN, SECRET } from './config';

const __dirname = dirname(fileURLToPath(import.meta.url))
const originList: string[] = ORIGIN.split(' ');
const sessionParser = session({
  store: redisStore,
  name: COOKIE_NAME,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: SECRET,
  cookie: { maxAge: COOKIE_MAXAGE, sameSite: 'none', httpOnly: true, secure: true }
});
const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || originList.indexOf(origin) !== -1)
      cb(null, origin)
    else
      cb(new Error('not allowed by cors'))
  },
  credentials: true,
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
// export default createServer(app);
export default createServer({
  key: readFileSync('./ssl/private.key', 'utf8'),
  cert: readFileSync('./ssl/server.crt', 'utf8')
}, app);

// for req.session.user issue
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
