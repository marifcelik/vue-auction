import mongoose from "mongoose";
import logger from "./logger";
import { DB_CONN_STR } from '../config'

await mongoose.connect(DB_CONN_STR)
logger.logger.info('database connected')
