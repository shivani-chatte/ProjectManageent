import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { history } from "src/Entity/history.entity";
import { HistoryService } from "./history.service";


@Controller('history')
export class HistoryController {
    constructor( private readonly historyservice:HistoryService){}


    @Post()
    create(@Body() post){
      return this.historyservice.createdata(post);
    }
    @Get()
    find(){
        return this.historyservice.findAllPosts();
    }
    @Put(':id')
    update(
        @Param('id') id:number,
    @Body()post:history
    ){
        return this.historyservice.updateuser(id,post);


    }
   


    

}
