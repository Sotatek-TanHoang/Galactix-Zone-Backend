import { NotFoundException } from '@nestjs/common';

const Web3 = require('web3-eth');

export const getWeb3ProviderLink = () => process.env.PROVIDER;

export const getWeb3 = () => {
    const provider = getWeb3ProviderLink();
    if (!provider) throw new NotFoundException('Missing Provider');
    return new Web3(provider);
};
export const recoverSignature = (signData: string, signature: string) => {
    const web3 = new Web3();
    return web3.accounts.recover(signData, signature);
};
