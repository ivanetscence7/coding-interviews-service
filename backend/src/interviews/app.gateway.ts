import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('codeToServer')
  handleExecuteCode(client: Socket, payload: { room: string; executedCode: string }) {
    this.logger.log('server' + payload.executedCode);
    this.server.to(payload.room).emit('codeToClient', payload.executedCode);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: { room: string; message: string }) {
    this.logger.log('server' + payload.message);
    this.server.to(payload.room).emit('msgToClient', payload.message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    this.logger.log('join: ' + room);
    client.join(room);
    client.emit(room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    this.logger.log('leave: ' + room);
    client.leave(room);
    client.emit(room);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
