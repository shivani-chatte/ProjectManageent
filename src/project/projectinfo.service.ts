import { Body, Injectable, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { projectassign } from 'src/Entity/projectassign.entity';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { technologyassign } from 'src/Entity/technologyassign.entity';
//import { projectassign } from 'src/Entity/projectassign.entity';

import { Connection, createQueryBuilder, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProjectinfoService {


    constructor(
        @InjectRepository(Projectinfo)
        private projectinforepository: Repository<Projectinfo>,
        @InjectRepository(projectassign)
        private projectassignRepository: Repository<projectassign>,
        @InjectRepository(technologyassign)
        private techologyassignRepository: Repository<technologyassign>
    ) { }

 //  <--------------------------add project with multiple user and multiple technology------------------------------------------->
 async createreport(post){
    let projectinfo = new Projectinfo()
                 projectinfo['ProjectName'] = post.ProjectName
                 projectinfo['ProjectTechnology'] = post.ProjectTechnology
                 projectinfo['ProjectResources'] = post.ProjectResources
                 projectinfo['VenderName'] = post.VenderName
                 projectinfo['Email'] = post.Email
                 projectinfo['MobileNo'] = post.MobileNo
                 projectinfo['CompanyName']=post.CompanyName
                 projectinfo['ProjectDuration']=post.ProjectDuration
                 projectinfo['ProjectScope']=post.ProjectScope
    let project = await this.projectinforepository.save(post)
    post.registrationId.forEach(async element => {
        let projectInfo=new projectassign()
        projectInfo['projectinfoId']=project.id;
        projectInfo['registrationId']=element
        let userProj=await this.projectassignRepository.save(projectInfo);
        
    });
    post.technologyId.forEach(async element => {
        let projectInfo=new technologyassign()
        projectInfo['projectinfoId']=project.id;
        projectInfo['technologyId']=element
        let techProj=await this.techologyassignRepository.save(projectInfo);
        
    });
    let msg = "Project added successfully"
    return msg
}


     //<-------------------------------view project----------------------------------->

    async findAllPosts() {

        const found = await createQueryBuilder("project") 
                        .leftJoinAndSelect("project.projectassigns",'pa')
                        .leftJoinAndSelect("project.technologyassigns",'ta')
                        .where({status:0})
                        .getMany()
        return found
        
    }

    //<-------------------------------view one project-------------------------------->

    async getprojectbyId(id:number):Promise<Projectinfo>{
        const found= await this.projectinforepository.findOne(id,{relations:['projectassigns','technologyassigns']});
        if(!found){
         throw new NotFoundException('data not found');
        }
        if(found.status == 0){
            throw new NotFoundException('data not found');
        }
        return found;
     }
      //<---------------------------------edit project--------------------------------->

    async updateProject(id: number, post: Projectinfo) {
        const found= await this.projectinforepository.findOne(id,{relations:['projectassigns','technologyassigns']});
        if (found.status==1) {
            throw new NotFoundException(`${id} is not exist`)
        }
        from(this.projectinforepository.update(id, post))
        let msg = "Updated Succefully"
        return msg
    }
    
       //<-------------------------------delete project----------------------------------->

    async deleteproject(id: number) {
        const project = await this.projectinforepository.findOne(id);
        if (!project) {
            throw new NotFoundException(`${id} is not exist`)
        }
        project.status = 1
        return await this.projectinforepository.update(id, {
            ...(project.status && { status: 1 })
        });
    }

    async select(id){
        return await this.projectinforepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.tasks','t')
        .leftJoinAndSelect('t.sub_tasks','st')
        .leftJoinAndSelect('st.registrations','r')
        .where({ id })
        .getOne();
      
      }

}




