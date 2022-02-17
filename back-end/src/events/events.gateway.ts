import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('signaling')
  handleSignal(@MessageBody() data: string, client: Socket) {
    // console.log(data);
    // console.log(client.id);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
    console.log(client.rooms);
    client.emit('signaling', 'hi');

    const room = 'ExampleRoom';

    const join = (room) => {
      // Count clients in room
      // Check if client can join to the room
      client.join(room);
      client.emit('join', { clientCount: 1 });
      console.log('Joined to room!');
    };

    join(room);

    client.on('signaling', (message) => {
      client.to(room).emit('signaling', message);
    });
  }
}
