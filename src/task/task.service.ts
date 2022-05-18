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

        task.registrationId.forEach(async element => {
          let projectInfo=new taskassign()
          projectInfo['taskId']=task.id;
          projectInfo['registrationId']=element
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
                                .where({status:0})
                                .getMany()
          return task
          
     }

      //-------------------------------find task by project_id-------------------------------------------//

     async findalltask(project_id:number){    
      const task = await createQueryBuilder("task").where('"project_id" = :project_id', { project_id }).getMany()
      return task
   }
      //--------------------------------update task-------------------------------------------//

     async update(id: number, data: task){
    
      const datas = await this.taskRepository.findOne(id, { relations: ["project_infos"] });
      if(datas.status == 1){
        throw new NotFoundException(`${id} is not exist`)
      }
       await this.taskRepository.update(id, data)
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
