import { Body, Controller, NotFoundException, Param, Put } from '@nestjs/common';

import { ResetService } from './reset.service';
@Controller('reset')


export class ResetController {
    constructor( private readonly resetservice:ResetService){}
    
   @Put(':id')
     async update(@Param('id') id:number,
     @Body()data ){
        const user =await this.resetservice.updatePassword(id,data);
        if(!user){
            throw new NotFoundException(`${id} is not exist`)
          }
        return user;
       }
}
