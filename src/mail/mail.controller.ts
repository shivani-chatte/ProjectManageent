import { Controller, Post, Query, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import * as md5 from 'apache-md5';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send')
    sendEmail(@Body() data) {
        let mail = this.mailService.sendMail(data)
        if (mail) {
            var minutesToAdd=30;
            var currentDate = new Date();
            var expiryDate = new Date(currentDate.getTime() + minutesToAdd*60000);
            var encryptedexpiryDate = md5(expiryDate)
            var link = 'https://localhost:4200/#/reset/'+encryptedexpiryDate;
          
        }
        
    }
}
