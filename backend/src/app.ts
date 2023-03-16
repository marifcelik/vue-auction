import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import config from './config';
import logger from './utils/logger';
import './utils/db';

const app = express();
const redisClient = createClient()
  .connect()
  .then(() => console.log('bağlandı'))
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger)
app.use(
  session({
    store: new RedisStore({ client: redisClient, prefix: 'app:' }),
    resave: false,
    saveUninitialized: false,
    secret: config.SECRET
  })
);

app.get('/', (req, res) => {
  res.send('kartaca cekirdekten yetisenler case');
});

export { logger };
export default app;
