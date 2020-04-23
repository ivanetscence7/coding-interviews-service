import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketIoService {
  text: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  executedCode: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  hashRoomName: string;
  private socket = io(environment.socketUrl);

  constructor(private router: Router) {}

  receiveText(): BehaviorSubject<string> {
    this.socket.on('msgToClient', msg => {
      this.text.next(msg);
    });
    return this.text;
  }

  receiveExecutedCode(): BehaviorSubject<string> {
    this.socket.on('codeToClient', msg => {
      this.executedCode.next(msg);
    });
    return this.executedCode;
  }

  sendText(text: any) {
    this.socket.emit('msgToServer', text);
  }

  sendExecutedCode(template: any) {
    this.socket.emit('codeToServer', template);
  }

  joinRoom(roomName: string) {
    this.socket.emit('joinRoom', roomName);
    this.router.navigate(['/editor/', roomName]);
  }

  leaveRoom(roomName: string) {
    this.socket.emit('leaveRoom', roomName);
  }

  joinedRoom(): string {
    this.socket.on('joinedRoom', room => {
      if (room) {
        this.hashRoomName = room;
      }
    });
    return this.hashRoomName;
  }

  leftRoom(): string {
    this.socket.on('leftRoom', room => {
      if (room) {
        this.hashRoomName = room;
      }
    });
    return this.hashRoomName;
  }
}
