import pinoHttp from 'pino-http';

const pino = pinoHttp({
  transport: { target: 'pino-pretty' }
});

export const { logger } = pino;
export default pino;
