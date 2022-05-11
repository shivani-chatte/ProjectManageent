import { Controller, Post, Query, Body, NotFoundException } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send')
    sendEmail(@Body() data) {
        return this.mailService.sendMail(data)
        
    }
}
