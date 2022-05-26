import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { task } from 'src/Entity/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(
        private readonly taskService: TaskService){}

        
    //-----------------------------------------add task------------------------------------------------------//
        @Post()
        async save(@Body() task:task){
                const projectinfo = await this.taskService.getprojectById(task.project_infos);
                return await this.taskService.Add(task,projectinfo);
              }
    //-----------------------------------------get task------------------------------------------------------// 
        @Get()
        findAll(){
            return this.taskService.findall();
        }

    //-----------------------------------find one task by id------------------------------------------// 
   
        
    @Get('/:id')
    async gettaskById(@Param('id') id: number){
      return await this.taskService.gettaskbyId(id);
    }
    //-----------------------------------------update task------------------------------------------------------// 

        @Put('/update')
        update(
          //@Param('id') id: number,
          @Body()task){
              return this.taskService.update(task);
              
          }

    //--------------------------------update task-------------------------------------------//

          @Put('delete/:id')
          delete(
              @Param('id') id: number){
                  return this.taskService.delete(id);
                  
              }

        
    @Get('project/:id')
    getResource(@Param('id') id: number,){
        return this.taskService.getResource(id);
    }      
}
      
        

