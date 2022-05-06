import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registration } from 'src/Entity/registration.entity';
import { Repository } from 'typeorm';
import { RegistrationService } from 'src/registration/registration.service'
import { Observable } from 'rxjs';
//import * as md5 from 'apache-md5'
const md5 = require("apache-md5");

@Injectable()
export class LoginService {
  constructor(
    // @InjectRepository(registration)
    // private readonly RegRepository: Repository<registration>,
    private RegistrationService : RegistrationService
    ){}

    async validateUser(data) {
      
       const user = await this.RegistrationService.findbyUserName(data.user_name);
       const encrptpassword = user.password;
       
       const isMatch = md5(data.password, encrptpassword) == encrptpassword;
        
        if (user && isMatch) {
           const { password, ...result} = user;
           return ("successful")
        }
        else{
          return ("Invalid username or password")
        }
       
  
    }
  
}