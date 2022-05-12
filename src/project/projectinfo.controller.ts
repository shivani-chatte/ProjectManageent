import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProjectinfoService } from './projectinfo.service';

@Controller('projectinfo')
export class ProjectinfoController {
    constructor( private readonly projectinfoservice:ProjectinfoService){}

    @UsePipes(new ValidationPipe)
  //  <--------------------------addproject----------------------------->

    @Post()
    createdata(@Body() post){
      return this.projectinfoservice.allocateproject(post);
    }
//<-------------------------------view project-------------------------------->
    @Get()
    find(@Body()post:Projectinfo){
        return this.projectinfoservice.findAllPosts();
    }
    //<-------------------------------view one project------------------------------>
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.projectinfoservice.findOnePosts(id)
            
    }
    //<---------------------------------edit project---------------------------------->
    @Put(':id')
    update(
        @Param('id') id:number,
    @Body()post:Projectinfo 
    ){
        return this.projectinfoservice.updateProject(id,post);


    }
    //<-------------------------------deleteproject------------------------------------>
    @Delete(':id')
    delete(@Param('id')id:number){
     return this.projectinfoservice.deleteproject(id);   
    }
 
   

    
}
