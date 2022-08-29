import { LoginUserDto } from '@modules/users/providers/dtos/user-request.dto';
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { recoverSignature } from '@shared/utils/web3';


@Injectable()
export class SignatureValidationPipe implements PipeTransform {
  transform(value: LoginUserDto, metadata: ArgumentMetadata) {
    try{
        const {sign_data,signature,wallet_address}=value;
        // check for signature;
        const src_address=recoverSignature(sign_data,signature);
        if(src_address!==wallet_address){
          throw new Error();
        }
        return value;
    }catch(e){
      console.log('====================================');
      console.log(e.message);
      console.log('====================================');
      throw new HttpException('Check your signature data!',HttpStatus.BAD_REQUEST);
    }
  }
}