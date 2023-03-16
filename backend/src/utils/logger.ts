import pinoHttp from "pino-http";

const logger = pinoHttp({
  transport: { target: 'pino-pretty' },
  base: { pid: false }
});

export default logger
