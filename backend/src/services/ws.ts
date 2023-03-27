import { Request, Response } from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { IBid } from '../models/Bid.model';
import server, { sessionParser } from '../server';
import { logger } from '../utils/logger';

export function wsBroadcast(bid: IBid) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.product == bid.productId)
      client.send(JSON.stringify(bid));
  });
}

type WsReq = {
  type: string,
  data?: IBid,
}

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req: Request, socket, head) => {
  sessionParser(req, {} as Response, () => {
    if (!req.session.user) {
      logger.warn('unauthorized ws request');
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      const product = new URL(req.url, `http://${req.headers.host}`).searchParams.get('prod') ?? '0'
      const clientId = crypto.randomUUID();

      ws.clientId = clientId
      ws.product = parseInt(product)
      wss.emit('connection', ws, req);
    });
  });
});

wss.on('connection', (ws, req) => {
  logger.info(`ws connection ${ws.clientId} - prod ${ws.product}`);
  logger.info(`ws url : ${req.url}`)

  ws.onmessage = (event) => {
    try {
      const { type, data }: WsReq = JSON.parse(event.data.toString());
      ws.emit(type, data);
    } catch (err) {
      logger.warn('incorrect message type from ' + ws.clientId);
      logger.warn('message : ' + event.data);
      ws.send('incorrect message');
    }
  };

  ws.send('your id is : ' + ws.clientId);

  ws.on('list', () => {
    ws.send(JSON.stringify(wss.clients))
  })

  ws.on('close', (code, reason) => {
    logger.info({ msg: 'ws connection close', code, reason })
  })
});

declare module 'ws' {
  export interface WebSocket {
    clientId: string;
    product: number;
  }
}
