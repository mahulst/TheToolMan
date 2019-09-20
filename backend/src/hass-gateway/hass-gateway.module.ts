import { Module } from '@nestjs/common';
import { HassGateway } from './hass-gateway';

@Module({
    providers: [HassGateway],
})
export class HassGatewayModule {}
