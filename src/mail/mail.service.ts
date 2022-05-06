import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { RegistrationService } from "src/registration/registration.service";


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
        private RegistrationService: RegistrationService
    ) { }


    async sendMail(data) {
        const user = await this.RegistrationService.findbyEmail(data.email);
        if (!user) {
            // let result = "Enter valid email ID"
            console.log('is working');
            return await { msg: "Enter valid Email Id" };
        } else {
            // console.log(data.link)
            await this.mailerService.sendMail({
                to: data.email, // list of receivers
                template: '/email',
                context: {
                    name: data.name,
                    // link: data.link
                } // HTML body content
            })
                .then(() => { })
                .catch(() => { });

            return user
        }

    }
}
