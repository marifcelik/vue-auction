import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

expand(dotenv.config());

export const
  ORIGIN = process.env.ORIGIN ?? "https://localhost:5173 https://192.168.1.11:5173 https://localhost:4173 https://192.168.1.3",
  HOST = process.env.HOST ?? 'localhost',
  PORT = (process.env.PORT ?? 5048) as number,
  DB = process.env.DB ?? 'kartaca',
  DB_HOST = process.env.DB_HOST ?? '127.0.0.1',
  DB_PORT = (process.env.DB_PORT ?? 27017) as number,
  DB_CONN_STR = process.env.DB_CONN_STR ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB}`,
  REDIS_HOST = process.env.REDIS_HOST ?? 'localhost',
  REDIS_PORT = (process.env.REDIS_PORT ?? 6379) as number,
  SECRET = process.env.SECRET ?? 'do not use secret like this',
  COOKIE_NAME = process.env.COOKIE_NAME ?? 'sessionid',
  COOKIE_MAXAGE = (process.env.COOKIE_MAXAGE ?? 1000 * 60 * 60 * 24) as number,
  COUNTDOWN = process.env.COUNTDOWN ?? 300

export default { HOST, PORT, DB, DB_HOST, DB_PORT, SECRET, COOKIE_NAME };
