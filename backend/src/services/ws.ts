import { Request, Response } from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import server, { sessionParser } from '../server';
import { logger } from '../utils/logger';

type Bid = {
  user: string;
  product: number;
  bid: number;
};
type WsConn = {
  id: string,
  product: string
}
type WsReq = {
  type: string,
  data?: Bid,
}

declare module 'ws' {
  export interface WebSocket {
    clientId: string
  }
}

const wss = new WebSocketServer({ noServer: true });
let websockets: WsConn[] = []

server.on('upgrade', (req: Request, socket, head) => {
  sessionParser(req, {} as Response, () => {
    if (!req.session.user) {
      logger.warn('unauthorized ws request');
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      const clientId = crypto.randomUUID();
      const product = new URL(req.url, `http://${req.headers.host}`).searchParams.get('prod') ?? '0'

      logger.info(product)
      ws.clientId = clientId
      websockets.push({ id: clientId, product })
      wss.emit('connection', ws, req);
    });
  });
});

wss.on('connection', (ws, req) => {
  logger.info(`ws connection ${ws.clientId}`);
  logger.info(`ws url : ${req.url}`)

  ws.onmessage = (event) => {
    try {
      const { type, data }: WsReq = JSON.parse(event.data.toString());
      ws.emit(type, data);
    } catch (err) {
      logger.warn('incorrect message type from ' + ws.clientId);
      logger.warn('message : ' + event.data);
      ws.send(JSON.stringify(err));
    }
  };

  ws.send('your id is : ' + ws.clientId);

  ws.on('bidding', (bid: Bid) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(bid));
    });
  });

  ws.on('list', () => {
    ws.send(JSON.stringify(websockets))
  })

  ws.on('close', (code, reason) => {
    logger.info({ msg: 'ws connection close', code, reason })
    websockets = websockets.filter(openWs => openWs.id !== ws.clientId)
  })
});
