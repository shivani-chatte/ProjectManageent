import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { sub_task } from 'src/Entity/sub_task.entity ';
import { SubTaskService } from './sub_task.service';



@Controller('subtask')
export class SubTaskController {

     constructor(private readonly subtaskService:SubTaskService){}

    // <-----------------------------create and save subtask------------------------------------ >//  
     @Post()
         async save(@Body() subtask){
              const task = await this.subtaskService.gettaskById(subtask.tasks);
              return await this.subtaskService.Add(subtask,task);
            }
 

  // <-----------------------------using id find all subtask------------------------------------- >//  
  @Get(':task_id')
      findonesubtask(@Param('task_id') task_id:number,){
           return this.subtaskService.findsubtask(task_id);
  }
  //------------------------------------Get all subtask-------------------------------------------//
  @Get()
  GetAll(){
      return this.subtaskService.findsubtasks();
  }
   
  
   // <-----------------------------update  subtask---------------------------------------------- >//
  
   @Put(':id')
   update(
     @Param('id') id: number,
     @Body() subtasks: sub_task){
         return this.subtaskService.update(id, subtasks);         
     }

   // <-----------------------------Delete subtask---------------------------------------------- >// 
   @Put('delete/:id')
          delete(
              @Param('id') id: number){
                  return this.subtaskService.delete(id);
                  
              }

    @Get('task/:id')
    get(@Param('id') id: number){
        return this.subtaskService.select(id);
    }
}
