import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { department } from 'src/Entity/department.entity';
import { DeleteResult } from 'typeorm';
import { HolidayService } from './holiday.service';


@Controller('holiday')
export class HolidayController {
    
        constructor( private readonly HolidayService:HolidayService){}
    

        @Post()
        createdata(@Body() post){
          return this.HolidayService.save(post);
        }
      
        @Get(':id')
        find(@Param('id') id:number){
             return this.HolidayService.findByRegistrationsId(id)
        }
                
        @Delete()
        delete(@Body() date){
         return this.HolidayService.deleteHoliday(date)  
        }
}
