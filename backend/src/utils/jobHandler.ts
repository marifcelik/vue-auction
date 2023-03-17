import { Document, Query } from 'mongoose';
import { IUserModal } from '../models/User.model';
import { logger } from './logger';

type UserDoc = Document<unknown, {}, IUserModal>;

// REVIEW: find a better name
/* TODO: this function must be check error types and return status code too,
according to error type */
// REVIEW: Query type
async function jobHandler(job: Promise<UserDoc> | Query<any, any>) {
  try {
    const data = await job;
    return [data, null];
  } catch (err) {
    logger.error(err);
    return [null, err];
  }
}

export default jobHandler;
