import { Body, Controller, Get, Param } from "@nestjs/common";
import { dashService } from "./dash.service";




@Controller('dash')
export class dashController {
   
    constructor(private readonly dashservice:dashService){}

   
  @Get('today/:id')
   getToday(@Param('id') id: number){
    return this.dashservice.getToday(id);
  }

  @Get('previous/:id')
  getPrevious(@Param('id') id: number) {
    return this.dashservice.getPrevious(id);
  }

  @Get('week/:id')
  getWeek(@Param('id') id: number) {
    return this.dashservice.getWeek(id);
  }
  
   @Get('month/:id')
   getMonth(@Param('id') id: number){
     return this.dashservice.getMonth(id);
   }   

   @Get('range/:id')
  getbetween(@Param('id') id: number, @Body() data) {
    return this.dashservice.getBetween(data,id);
  }


}