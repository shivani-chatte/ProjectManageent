import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegistrationService } from "src/Authentication/registration/registration.service";
import * as md5 from 'apache-md5';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
        private RegistrationService: RegistrationService
    ) { }

    //--------------   Process of Sending Mail  ---------------//

    async sendMail(data) {
        const user = await this.RegistrationService.findbyEmail(data.email);
        if (!user) {
            throw new BadRequestException(`${data.email} is not valid email`)
            
        } else {
            var minutesToAdd=30;
            var currentDate = new Date();
            var expiryDate = new Date(currentDate.getTime() + minutesToAdd*60000);
            var encryptedexpiryDate = md5(expiryDate)
            await this.mailerService.sendMail({
                to: data.email, 
                template: '/email',
                context: {
                    name: data.name,
                    link : 'https://localhost:4200/#/reset/'+encryptedexpiryDate+'/'+user.id
                } 
            })
                .then(() => { })
                .catch(() => { });

            return user
        }

    }
}
