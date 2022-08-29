import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Connection } from './providers/web3.service';

@Module({
    imports: [ConfigModule],
    exports: [Connection],
    providers: [Connection],
})
export class Web3Module {}
