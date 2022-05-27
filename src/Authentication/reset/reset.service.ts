import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { registration } from 'src/Entity/registration.entity';
import { Repository } from 'typeorm';
import * as md5 from 'apache-md5';
import { RegistrationService } from 'src/registration/registration.service';
var crypto = require('crypto');
var CryptoJS = require("crypto-js");

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

        var key = "2e35";
        var date = data.date
        var decrypted = new Date(CryptoJS.AES.decrypt(date, key).toString(CryptoJS.enc.Utf8));
       
        var minutesToAdd=30;
        var endDate = new Date(decrypted.getTime() + minutesToAdd*60000);
        var currentDate = new Date()
        if(endDate < currentDate){
                var error = "Time Out, Fail to reset"
                return error
        }


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

    //  async check(data){
    //     var key = "2e35";
    //     var date = data.date
    //     var decrypted = new Date(CryptoJS.AES.decrypt(date, key).toString(CryptoJS.enc.Utf8));
       
    //     var minutesToAdd=3000;
    //     var endDate = new Date(decrypted.getTime() + minutesToAdd*60000);
    //     var currentDate = new Date()
    //     if(endDate < currentDate){
    //             var error = "Time Out, Fail to reset"
    //             return error
    //     }
    //     console.log(currentDate);
    //     console.log(endDate);
    //         // decrypted = decrypted.toString();
    //         // console.log(decrypted);

    // }
     
}
