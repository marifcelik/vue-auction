import { logger } from './utils/logger';
import { HOST, PORT } from './config';
import './services/ws.js';
import server from './server';

function kill() {
  server.close()
  process.exit()
}

process.on('SIGTERM', kill)
process.on('SIGINT', kill)

server.listen(PORT, () => logger.info(`server listening on ${HOST}:${PORT}`));
