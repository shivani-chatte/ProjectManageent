import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { RegistrationService } from 'src/registration/registration.service';

//import { UpdatePasswordService } from 'src/update/updatepassword.service';

const md5 = require("apache-md5");

@Injectable()
export class LoginService {
  constructor( private RegistrationService : RegistrationService ){}

    //--------------------Validating user for login----------------------//
    async validateUser(data) {
      
       const user = await this.RegistrationService.findbyUserName(data.user_name);
       if(!user){
        let error =  new HttpException('Invalid username', HttpStatus.NOT_FOUND);
        return error
      }
      if(user.status == 1){
        let error =  new HttpException('Invalid username', HttpStatus.NOT_FOUND);
        return error
      }
       const encrptpassword = user.password;
       
       const isMatch = md5(data.password, encrptpassword) == encrptpassword;
        //console.log(isMatch) 
        if (user && isMatch) {
           const {password,...result} = user;
           const msg = "login successful"
          return (msg)
          //console.log(msg)
        }
        else{
          throw new HttpException('Invalid Password', HttpStatus.NOT_FOUND);
        }

//         const result = await this.RegistrationService.login(user)

//         if (result.status === 200) {
//         jscookie.set('token', result.id);
// }



















       
  
    }
  
}