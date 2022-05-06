import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { UpdatePasswordService } from './updatepassword.service';
import * as md5 from 'apache-md5';

@Controller('update')
export class UpdatePasswordController {

    constructor(private readonly UpdatePasswordService:UpdatePasswordService){}

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() data){
            
            const updateuser=this.UpdatePasswordService.update(id,data);
            
             return updateuser;
        }
}
