import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registration } from 'src/Entity/registration.entity';
import { RegistrationService } from 'src/registration/registration.service';
import { Repository, UpdateResult } from 'typeorm';
import * as md5 from 'apache-md5';

var crypto = require('crypto');

@Injectable()
export class UpdatePasswordService {
    constructor(
        @InjectRepository(registration)
        private resetRepository:Repository<registration>,
        private readonly registrationService: RegistrationService
    ){}


    async update(id: number,data){
        console.log(data);
        const user= await this.registrationService.findOneUser(id)
        console.log(user);let encrptpassword=user.password;
        const isMatch=md5(data.password,encrptpassword) == encrptpassword;
        console.log(isMatch);
        if(!(user && isMatch)){
            
            return ("Password doesnot match");
        }
        
        if(data.newpassword !== data.confirmpassword){
            return "confirmpassword not match with password";

        }
      
        encrptpassword = md5(data.newpassword)
        data['newpassword']=encrptpassword
        return await this.resetRepository.update(id,{password:data.newpassword})
        
    }
    

}
