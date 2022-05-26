import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { task } from 'src/Entity/task.entity';
import { taskassign } from 'src/Entity/taskassign.entity';
import { createQueryBuilder, In, Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(task)
        private readonly taskRepository: Repository<task>,
        @InjectRepository( Projectinfo)
        private readonly  projectinfoRepository: Repository< Projectinfo>,
        @InjectRepository(taskassign)
        private taskassignRepository: Repository<taskassign>){}

       //----------------------------------add task---------------------------------------// 

       async Add(task,Projectinfo:Projectinfo){
        let tasks = await this.taskRepository.save(task);

        task.TaskResource.forEach(async element => {
          let projectInfo=new taskassign()
          projectInfo['taskId']=task.id;
          projectInfo['TaskResource']=element
           let userProj = await this.taskassignRepository.save(projectInfo);
        });
        let msg = "Added successfully"
        return msg
      }
      
    
      async getprojectById(id): Promise<Projectinfo>{
        let projectinfo=  await this.projectinfoRepository.findOne(id, {relations :['tasks']});
        if(!projectinfo){
          throw new NotFoundException(`${id} is not valid project`)
        }
        return projectinfo;
      }


      //--------------------------------find all task-------------------------------------------//
        async findall(){
            const task = await createQueryBuilder("task") 
                                .leftJoinAndSelect("task.project_infos",'pi')
                                .where({Status:0})
                                .getMany()
          return task
          
     }

      //-------------------------------find one task by id-------------------------------------------//

      async gettaskbyId(id:number){
        const found= await this.taskRepository.findOne(id,{relations:['categorys','prioritys']});
        if(!found){
         throw new NotFoundException('data not found');
        }
        if(found.status == 1){
            throw new NotFoundException('data not found');
        }
        return found;
        
      }
      //--------------------------------update task-------------------------------------------//

     async update( data){
    
      const datas = await this.taskRepository.findOne({ relations: ["project_infos"] });
      // if(datas.status == 1){
      //   throw new NotFoundException(`${id} is not exist`)
      // }
      let Task=new task()
      Task['TaskName']=data.TaskName,
      Task['TaskDescription']=data.TaskDescription,
      Task['TaskDuration']=data.TaskDuration,
      Task['category']=data.category,
      Task['priority']=data.priority,
      //Task['ContactNumber']=data.ContactNumber,
       await this.taskRepository.update(data.taskId,Task)
       data.TaskResource.forEach(async(element:any)=>{
        let Taskassign=new taskassign();
        Taskassign['taskId']=element.taskId;
        Taskassign['id']=data.id;
        Taskassign['TaskResource']=element;
        const dataa=await this.taskassignRepository.save(Taskassign)
    })


       let msg = "Updated Succefully"
       return msg
    }
    
    //--------------------------------delete task-------------------------------------------//

    async delete(id: number){
      const tasks = await this.taskRepository.findOne(id, { relations: ["project_infos"] });
      if(!tasks){
        throw new NotFoundException(`${id} is not exist`)
      }
      tasks.status = 1
      return await this.taskRepository.update(id, {
        ...(tasks.status && { status: 1 })});
    }
    async getResource(id){
      return await this.projectinfoRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.projectassigns','pa')
      .leftJoinAndSelect('pa.registrations','r')
      .where({ id })
      .getOne();
    }    
    
}
