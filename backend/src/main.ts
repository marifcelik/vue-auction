import app from './app';
import { logger } from './utils/logger';
import { HOST, PORT } from './config';

app.listen(PORT, () => logger.info(`server listening on ${HOST}:${PORT}`));
