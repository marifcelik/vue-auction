import mongoose from 'mongoose';
import { Store } from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { logger } from '../utils/logger';
import { DB_CONN_STR, REDIS_HOST, REDIS_PORT } from '../config';

try {
  await mongoose.connect(DB_CONN_STR, {
    directConnection: true
  });
  logger.info('connected to mongodb');
} catch (err) {
  logger.info(DB_CONN_STR)
  logger.error(err);
}

let redisStore: Store;

try {
  const redisClient = createClient({
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
  });
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
