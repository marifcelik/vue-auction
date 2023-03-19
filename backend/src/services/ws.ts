import { WebSocket, WebSocketServer } from 'ws';
import server from '../server';
import { logger } from '../utils/logger';

type Offer = {
  user: string;
  product: number;
  offer: number;
};

const wss = new WebSocketServer({ server });

// TODO: authenticate user
// server.on('upgrade', (req, socket, head) => {
//   wss.handleUpgrade(req, socket, head, (wws) => {
//     const authenticated = req.headers.cookie?.includes('session_id');
//     if (!authenticated){
//       wss.close(1008, 'Unauthorized')
//       return
//     }
//     wss.emit('connection', )
//   })
// })

wss.on('connection', (ws) => {

  const clientId = crypto.randomUUID();
  logger.info(`ws connection ${clientId}`);

  ws.onmessage = (event) => {
    try {
      const [type, data]: [string, Offer] = JSON.parse(event.data.toString());
      ws.emit(type, data);
    } catch (err) {
      logger.warn('incorrect message type from ' + clientId);
      logger.warn('message : ' + event.data);
      ws.send(event.data);
    }
  };

  ws.send('your id is : ' + clientId);

  ws.on('offer', (offer: Offer) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify(offer));
    });
  });
});
