import { Controller, Get } from '@nestjs/common';
import { UserTypeService } from './user_type.service';

@Controller('user-type')
export class UserTypeController {
    constructor(private readonly usertypeService:UserTypeService){}

    @Get()
    find(){
        return this.usertypeService.findall()
    }
}
