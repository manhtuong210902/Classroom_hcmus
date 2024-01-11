import { SocketService } from './socket.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) { }

  onModuleInit(socket: Socket) { }

  afterInit(server: Server) {
    this.socketService.server = server;
  }

  handleConnection(socket: Socket) {
    const authHeader = socket.handshake.headers.authorization;
    console.log(authHeader);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.server.emit('server', { 'server': true })
    return data;
  }
}
