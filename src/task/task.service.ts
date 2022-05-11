import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { task } from 'src/Entity/task.entity';
import { createQueryBuilder, In, Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(task)
        private readonly taskRepository: Repository<task>,
        @InjectRepository( Projectinfo)
        private readonly  projectinfoRepository: Repository< Projectinfo>){}

       //----------------------------------add task---------------------------------------// 

    async Add(task:task,Projectinfo:Projectinfo){
        return await this.taskRepository.save(task);
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
        await createQueryBuilder("task").where('"status" = :status', { status:0}).getMany()

        const task = await this.taskRepository.find({ relations: ["project_infos"] });
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
     
    return await this.taskRepository.update(id, data)
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

  
    
    
}
