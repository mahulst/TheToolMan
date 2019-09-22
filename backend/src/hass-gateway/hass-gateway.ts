import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets';
import { accessToken } from './access_token';

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
            access_token: accessToken,
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
