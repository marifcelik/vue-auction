import { Request, Response } from 'express';
// import { parse as parseUrl } from 'url';
import { WebSocket, WebSocketServer } from 'ws';
import server, { sessionParser } from '../server';
import { logger } from '../utils/logger';

type Offer = {
  user: string;
  product: number;
  offer: number;
};

// REVIEW: seperate ws for each /path
const wssA = new WebSocketServer({ noServer: true });
// const wssB = new WebSocketServer({ noServer: true });
// const wssC = new WebSocketServer({ noServer: true });

// TODO: authenticate user
server.on('upgrade', (req: Request, socket, head) => {
  sessionParser(req, {} as Response, () => {
    logger.info('inside session parser');
    console.log(req.session.user);
    if (!req.session.user) {
      logger.warn('unauthorized ws request');
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    logger.info('session is parsed');

    wssA.handleUpgrade(req, socket, head, (ws) => {
      ws.emit('connection', ws, req);
    });
  });
  // const { pathname } = parseUrl(req.url)
});

wssA.on('connection', (ws) => {
  const clientId = crypto.randomUUID();
  logger.info(`ws connection ${clientId}`);

  ws.onmessage = (event) => {
    try {
      const { type, data }: { type: string; data: Offer } = JSON.parse(event.data.toString());
      ws.emit(type, data);
    } catch (err) {
      logger.warn('incorrect message type from ' + clientId);
      logger.warn('message : ' + event.data);
      ws.send(event.data);
    }
  };

  ws.send('your id is : ' + clientId);

  ws.on('bidding', (offer: Offer) => {
    wssA.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(offer));
    });
  });
});
