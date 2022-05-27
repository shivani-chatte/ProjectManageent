import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment = require('moment'); 
//import moment from 'moment';
// import moment = require("moment");
import { history } from 'src/Entity/history.entity';
import { subtaskassign } from 'src/Entity/subtaskassign.entity';
import { sub_task } from 'src/Entity/sub_task.entity ';
import { task } from 'src/Entity/task.entity';
import { projectassign } from 'src/Entity/projectassign.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { RegistrationService } from 'src/registration/registration.service';



@Injectable()
export class SubTaskService {
    
    constructor(
        @InjectRepository(sub_task)
        private readonly subtaskRepository: Repository<sub_task>,
        @InjectRepository(task)
        private readonly taskRepository: Repository<task>,
        @InjectRepository(history)
        private readonly historyRepository: Repository<history>,
        @InjectRepository(Projectinfo)
        private projectinforepository: Repository<Projectinfo>,
        private readonly registrationService : RegistrationService
    ){}
    // // <------------------create and save sub task--------------------------------------- >         
    
    async Add(subtask,task){

          var now = moment(subtask.start_date)
          var end = moment(subtask.end_date)
          var duration = moment.duration(end.diff(now));
          var min = duration.asHours();
          subtask['totaltime']=min

          let details=await this.subtaskRepository.save(subtask);

          let subtasks=new history()
          subtasks['subtask_id']=details.id;
          subtasks['user_id'] = details.user_id;
          let usersubtask = await this.historyRepository.save(subtasks);

//           let tasks = await this.subtaskRepository.save(subtask);
// console .log(subtask)
//           subtask.registrationId.forEach(async element => {
//             console.log(subtask.id);
//              let projectInfo=new subtaskassign()
//              projectInfo['subtaskId']=subtask.id;
//              projectInfo['registrationId']=element
//               let userProj=await this.subtaskRepository.save(projectInfo);
           // console.log(userProj)
             
          //});
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
   
    // <-----------------------------find subtask by using taskid---------------------------------------- >// 
    async findsubtask(task_id:number){
      
      
      const subtask = await createQueryBuilder("sub_task") .where("task_id = :task_id",{task_id}).getMany()
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
    if(!subtasks)
    {
      throw new NotFoundException('data not found')
    }

    if(subtasks.status==1){
      throw new NotFoundException(`${id} is not exist`)
    }

    let subtask = await this.subtaskRepository.update(id,user);
    
    let hist = await this.historyRepository
    .createQueryBuilder('h')
    .update(history)
    .set({newuser_id : user.user_id})
    .where({subtask_id : id})
    .execute();
    
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


async select(id){
  return await this.taskRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.taskassigns','pa')
      .leftJoinAndSelect('pa.registrations','r')
      .where({ id })
      .getOne();
    }

  // <-------------------------------Dashboard----------------------------------------->//
  async selectuser(user_id){
    const user = await this.registrationService.findOneUser(user_id);
    if(user.user_type == 2 && user.user_type == 3){
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .where('st.user_id = :user_id', { user_id } )
        .getMany();
    }else{
      return await this.projectinforepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.tasks','t')
      .leftJoinAndSelect('t.sub_tasks','st')
      .leftJoinAndSelect('st.registrations','r')
      .getMany();
    }
  
  }

}


