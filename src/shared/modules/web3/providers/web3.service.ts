import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FetchResult } from 'types/web3-types';
import { Eth } from 'web3-eth';

import { getWeb3 } from '@shared/utils/web3';

@Injectable()
export class Connection {
    private web3: Eth;

    constructor(configService: ConfigService) {
        this.web3 = getWeb3();
    }

    async fetchBlockByHeight(height: number): Promise<FetchResult> {
        try {
            const block = await this.web3.getBlock(height, true);
            if (!block.hash) throw new Error();
            return { block, status: true, height };
        } catch (error) {
            console.error('fetch error: ', error.message);
            return { status: false, block: null, height };
        }
    }

    async getLatestBlockHeight(): Promise<number> {
        return await this.web3.getBlockNumber();
    }
    async isSmartContract(address: string) {
        const data = await this.web3.getCode(address);
        return data !== '0x';
    }
    async recoverSignature(signature: string, signData: string) {
        try {
            return this.web3.accounts.recover(signData, signature);
        } catch (e) {
            throw new HttpException('check signature failed!', HttpStatus.BAD_REQUEST);
        }
    }
}
