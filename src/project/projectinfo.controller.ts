import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Projectinfo } from 'src/Entity/project_info.entity';
//import { UserProject } from 'src/Entity/userproject.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProjectinfoService } from './projectinfo.service';


@Controller('projectinfo')
export class ProjectinfoController {
    constructor( private readonly projectinfoservice:ProjectinfoService){}

    @UsePipes(new ValidationPipe)
  //  <--------------------------addproject----------------------------->

    // @Post()
    // create(@Body() post:Projectinfo){
    //   return this.projectinfoservice.createproject(post);
    // }

    @Post()
    createReport(@Body() report){
      console.log(report);
      return this.projectinfoservice.createreport(report);
    }

//<-------------------------------view project-------------------------------->
    @Get()
    find(@Body()post:Projectinfo){
        return this.projectinfoservice.findAllPosts();
    }
    //<-------------------------------view one project------------------------------>
    // @Get(':id')
    // findOne(@Param('id',ParseIntPipe) id:number){

    //     return this.projectinfoservice.findOnePosts(id)
            
    // }
    @Get('/:id')
    async getproById(@Param('id') id: number){
      return await this.projectinfoservice.getprojectbyId(id);
    }
    //<---------------------------------edit project---------------------------------->
    @Put('/update')
    update(
         //@Param('id') id:number,
    @Body()post ){
        return this.projectinfoservice.updateProject(post);
 }
    //<-------------------------------deleteproject------------------------------------>
    @Delete(':id')
    delete(@Param('id')id:number){
     return this.projectinfoservice.deleteproject(id);   
    }

    @Get('result/:id')
    get(
        @Param('id') id: number
    ){
        return this.projectinfoservice.select(id);
    }


    
}
