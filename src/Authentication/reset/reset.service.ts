import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { registration } from 'src/Entity/registration.entity';
import { Repository } from 'typeorm';
import * as md5 from 'apache-md5';
import { RegistrationService } from 'src/registration/registration.service';
var crypto = require('crypto');


@Injectable()
export class ResetService {
    constructor (
        @InjectRepository(registration)
        private resetrepository : Repository<registration>,
        private readonly registrationService : RegistrationService
    ){}
   
    //---------------- Reset password---------------------//
    async updatePassword(id:number,data){
        
        const user = await this.registrationService.findOneUser(id);

        if(data.newpassword !== data.confirmpassword){
            throw new HttpException('Confirm passord is not same as password', HttpStatus.NOT_FOUND);
        }

        let encrptedpassword
        encrptedpassword = md5(data.newpassword);
        data['newpassword'] = encrptedpassword
        from(this.resetrepository.update(id ,{ password : data.newpassword}))
        let msg = "Successful"
        return msg
     }  
     
}
