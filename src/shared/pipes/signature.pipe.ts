import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

import { LoginUserDto } from '@modules/users/providers/dtos/user-request.dto';

import { recoverSignature } from '@shared/utils/web3';

@Injectable()
export class SignatureValidationPipe implements PipeTransform {
    transform(value: LoginUserDto, metadata: ArgumentMetadata) {
        try {
            const { sign_message, signature, wallet_address } = value;
            // check for signature;
            const src_address = recoverSignature(sign_message, signature);
            if (src_address !== wallet_address) {
                throw new Error();
            }
            return value;
        } catch (e) {
            throw new HttpException('Check your signature data!', HttpStatus.BAD_REQUEST);
        }
    }
}
