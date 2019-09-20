import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets';
const WebSocketConstructor = require('ws');

import { webSocket } from 'rxjs/webSocket';

@WebSocketGateway()
export class HassGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number = 0;
    constructor() {
        console.log('hello there');
        const ws = webSocket({ url: 'ws://localhost:8123/api/websocket', WebSocketCtor: WebSocketConstructor });
        ws.next({
            type: 'auth',
            access_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwY2NhODkyNzBlNWU0NjYxODQxNmFkNjYxOGViYjJlNiIsImlhdCI6MTU2ODk4NTQ5NiwiZXhwIjoxNjAwNTIxNDk2fQ._O6Fc81c5p5s3C05M_dsRIpcQMP6ZIdSIQM-8FdZOOg',
        });
        ws.next({
            id: 18,
            type: 'subscribe_events',
        });
        ws.subscribe(console.log, console.error, console.log);
    }

    async handleConnection() {
        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }
}
