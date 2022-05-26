import { Body, Controller, Get } from "@nestjs/common";
import { dashService } from "./dash.service";




@Controller('dash')
export class dashController {
   
    constructor(private readonly dashservice:dashService){}

   
  @Get('today')
   getToday(){
    return this.dashservice.getToday();
  }

  @Get('previous')
  getPrevious() {
    return this.dashservice.getPrevious();
  }

  @Get('week')
  getWeek() {
    return this.dashservice.getWeek();
  }
  
//   @Get('custom')
//   getCustom(@Body('from') from: string, @Body('to') to: string): object {
//       return this.dashservice.getCustom(from, to);
//   }
   @Get('month')
   getMonth(){
     return this.dashservice.getMonth();
   }   

   @Get('range')
  getbetween(@Body() data) {
    return this.dashservice.getBetween(data);
  }
}