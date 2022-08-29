import { Injectable } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt'


@Injectable()
export class AuthService{
    constructor(private readonly jwtService:JwtService){}
    hello(){
        console.log('====================================');
        console.log('hello world',this.jwtService.sign('ok'));
        console.log('====================================');
    }
}