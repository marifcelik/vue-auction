import { logger } from './utils/logger';
import { HOST, PORT } from './config';
import server from './server';
import './services/ws';

server.listen(PORT, () => logger.info(`server listening on ${HOST}:${PORT}`));
