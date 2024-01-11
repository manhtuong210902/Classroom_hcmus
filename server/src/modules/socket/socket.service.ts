import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
    public server: Server = null;

    handleEmitToUser(userId: string, event: string, data: object) {
        this.server.to(userId).emit(event, data);
    }
}
