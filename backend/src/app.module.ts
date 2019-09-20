import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HassGatewayModule } from './hass-gateway/hass-gateway.module';

@Module({
    imports: [HassGatewayModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
