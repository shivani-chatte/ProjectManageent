import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { history } from 'src/Entity/history.entity';
import { sub_task } from 'src/Entity/sub_task.entity ';
import { task } from 'src/Entity/task.entity';
// import { registration } from 'src/registration.entity';
import { createQueryBuilder, Repository } from 'typeorm';



@Injectable()
export class SubTaskService {
    constructor(
        @InjectRepository(sub_task)
        private readonly subtaskRepository: Repository<sub_task>,
        @InjectRepository(task)
        private readonly taskRepository: Repository<task>,
        @InjectRepository(history)
        private readonly historyRepository: Repository<history>
    ){}
    // // <------------------create and save sub task--------------------------------------- >         
    
    async Add(subtask:sub_task,task:task){
      let details= await this.subtaskRepository.save(subtask);
        //  console.log(element);
        //subtask.sub_task.save(subtask)
          let subtasks=new history()
          subtasks['subtask_id']=details.id;
          subtasks['user_id']=details.user_id;
          let usersubtask=await this.historyRepository.save(subtasks);
         // console.log(userProj)
         let msg = "Added successfully"
        return msg
          
      
    }
  
    //---------------------------find task-----------------------------//
    async gettaskById(id): Promise<task>{
      let task=  await this.taskRepository.findOne(id, {relations :['sub_tasks']});
      if(!task){
        throw new NotFoundException(`${id} is not valid user type`)
      }
      if(task.status==1){
        throw new NotFoundException(`${id} is not exist`)
      }
      return task;
    }


    // <-----------------------------using id find all subtask ---------------------------------------- >// 
    async findsubtask(task_id:number){
      const subtask = await createQueryBuilder("sub_task").where("task_id = :task_id",{task_id}).getMany()
      return subtask;
   }

     //------------------------------------Get all subtask---------------------------------------------//
     async findsubtasks(){
      const subtask = await createQueryBuilder("sub_task") 
                          .leftJoinAndSelect("sub_task.tasks",'t')
                          .where({status:0})
                          .getMany()
      return subtask
   }

   // <-----------------------------update  subtask---------------------------------------------- --->//
   async update(id: number, user){
    const subtasks = await this.subtaskRepository.findOne(id, { relations: ["tasks","registrations","historys"] });

    if(subtasks.status==1){
      throw new NotFoundException(`${id} is not exist`)
    }
    
    let upuser=new history()
    upuser['newuser_id'] = user.user_id;
    await this.historyRepository.update(id,upuser);
    let msg = "Updated Succefully"
    return msg
  }


// <-----------------------------Delete subtask-------------------------------------------- > 
async delete(id: number){
  const subtasks = await this.subtaskRepository.findOne(id, { relations: ["tasks"] });
  if(!subtasks){
    throw new NotFoundException(`${id} is not exist`)
  }
  subtasks.status = 1
  return await this.subtaskRepository.update(id, {
    ...(subtasks.status && { status: 1 })});
  }
}
