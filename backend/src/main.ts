import app, { logger } from './app';
import { HOST, PORT } from './config';

app.listen(PORT, () => {
    logger.logger.info(`server listening on ${HOST}:${PORT}`)
});
