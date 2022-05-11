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

    //-----------------------------------find task by project_id------------------------------------------// 
   
        @Get(':project_id')
        findtask(@Param('project_id') project_id: number,){
            return this.taskService.findalltask(project_id);
        }
    //-----------------------------------------update task------------------------------------------------------// 

        @Put(':id')
        update(
          @Param('id') id: number,
          @Body() task: task){
              return this.taskService.update(id, task);
              
          }

    //--------------------------------update task-------------------------------------------//

          @Put('delete/:id')
          delete(
              @Param('id') id: number){
                  return this.taskService.delete(id);
                  
              }
            
}
      
        

