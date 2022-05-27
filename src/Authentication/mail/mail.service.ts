import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegistrationService } from "src/registration/registration.service";
import * as md5 from 'apache-md5';
import { from } from "rxjs";

var CryptoJS = require("crypto-js");
// import { RegistrationService } from "src/registration/registration.service";


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
        private RegistrationService: RegistrationService
    ) { }

    //--------------   Sending Mail  ---------------//

    async sendMail(data) {
        const user = await this.RegistrationService.findbyEmail(data.email);
        if (!user) {
            let error=  new BadRequestException(`${data.email} is not valid email`)
            return error
        } 
        if (user.status == 1) {
            let error=  new BadRequestException(`${data.email} is not valid email`)
            return error
        }
        else {
            var currentDate = new Date();
            var Data = currentDate.toString()
            var key = "2e35";
            var encryptedDate = CryptoJS.AES.encrypt(Data, key).toString();

            console.log(encryptedDate)
            await this.mailerService.sendMail({
                to: data.email,
                template: '/email',
                context: {
                    name: data.name,
                    link : 'https://localhost:4200/#/reset/'+encryptedDate+'/'+user.id
                } 
            })
                .then(() => { })
                .catch(() => { });

            return user
        }

    }
}
