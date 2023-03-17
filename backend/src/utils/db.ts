import mongoose from 'mongoose';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { logger } from './logger';
import { DB_CONN_STR } from '../config';
import { Store } from 'express-session';

/* REVIEW: im not sure about this structure. look at again.
maybe better error handling, or drop redis connection to another file */

try {
  await mongoose.connect(DB_CONN_STR);
  logger.info('connected to mongodb');
} catch (err) {
  logger.error(err);
}

let redisStore: Store;

try {
  const redisClient = createClient();
  await redisClient.connect();
  logger.info('connected to redis');
  redisStore = new (RedisStore as any)({
    client: redisClient,
    prefix: 'app:',
    disableTouch: false
  });
} catch (err) {
  logger.error('redis connection error');
  logger.error(err);
}

export { redisStore };
