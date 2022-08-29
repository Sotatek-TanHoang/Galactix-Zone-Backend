import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@modules/users/providers/User.repository';
import { AuthService } from '@shared/auth/auth.service';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector,private userRepo:UserRepository,private authService:AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   try{
   this.authService.hello()
 
    return true;
   }catch(e){
    console.log('====================================');
    console.log(e.message);
    console.log('====================================');
    return false;
  }
  }
}