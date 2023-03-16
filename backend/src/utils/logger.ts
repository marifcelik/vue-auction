import pinoHttp from 'pino-http';

const pino = pinoHttp({
  transport: { target: 'pino-pretty' },
  base: { pid: false }
});

export const { logger } = pino;
export default pino;
