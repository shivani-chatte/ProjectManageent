import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { RegistrationService } from 'src/Authentication/registration/registration.service';

const md5 = require("apache-md5");

@Injectable()
export class LoginService {
  constructor( private RegistrationService : RegistrationService ){}

    //--------------------Validating user for login----------------------//
    async validateUser(data) {
      
       const user = await this.RegistrationService.findbyUserName(data.user_name);
       if(!user){
        throw new HttpException('Invalid username', HttpStatus.NOT_FOUND);
      }
       const encrptpassword = user.password;
       
       const isMatch = md5(data.password, encrptpassword) == encrptpassword;
        
        if (user && isMatch) {
           const { password, ...result} = user;
           const status = 201
          return (status)
        }
        else{
          throw new HttpException('Invalid Password', HttpStatus.NOT_FOUND);
        }
       
  
    }
  
}