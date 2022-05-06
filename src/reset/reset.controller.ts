import { Body, Controller, Get, HttpException, NotFoundException, Param, Put } from '@nestjs/common';

import { ResetService } from './reset.service';
@Controller('reset')


export class ResetController {

        constructor( private readonly resetservice:ResetService){}
   @Get(':id')
      findOne(@Param('id') id:number){
        return this.resetservice.getbyId(id)

 }
   @Put(':id')
     async update(@Param('id') id:number,
     @Body()data ){
      const found=await this.resetservice.getbyId(id);

      const user =await this.resetservice.updatePassword(id,data);
       if(!found){
           throw new NotFoundException(`${id} is not exist`)
         }
    return user;
       }
}
