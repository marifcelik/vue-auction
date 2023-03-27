import { logger } from './utils/logger';
import { HOST, PORT } from './config';
import './services/ws.js';
import server from './server';

server.listen(PORT, () => logger.info(`server listening on ${HOST}:${PORT}`));
