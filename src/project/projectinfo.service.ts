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
                //  projectinfo['ProjectTechnology'] = post.ProjectTechnology
                //  projectinfo['ProjectResources'] = post.ProjectResources
                 projectinfo['ContactName'] = post.ContactName
                 projectinfo['ContactEmail'] = post.ContactEmail
                 projectinfo['ContactNumber'] = post.ContactNumber
                 projectinfo['CompanyName']=post.CompanyName
                 projectinfo['ProjectDurationMonth']=post.ProjectDurationMonth
                 projectinfo['ProjectDurationDays']=post.ProjectDurationDays
                 projectinfo['ProjectScope']=post.ProjectScope
                let project=await this.projectinforepository.save(post)
    
      post.ProjectResources.forEach(async element => {
        console.log(project.id)
        let projectInfo=new projectassign()
        projectInfo['projectinfoId']=project.id;
        projectInfo['ProjectResources']=element
        let userProj=await this.projectassignRepository.save(projectInfo);
        
    });
    post.ProjectTechnology.forEach(async element => {
        console.log(element)
        let projectInfo=new technologyassign()
        projectInfo['projectinfoId']=project.id;
        projectInfo['ProjectTechnology']=element
        let techProj=await this.techologyassignRepository.save(projectInfo);
        
    });
    let msg = "Project added successfully"
    return msg
}


     //<-------------------------------view project----------------------------------->

    async findAllPosts() {

        const found = await createQueryBuilder("Projectinfo") 
                        .leftJoinAndSelect("Projectinfo.projectassigns",'pa')
                        .leftJoinAndSelect("Projectinfo.technologyassigns",'ta')
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
        if(found.status == 1){
            throw new NotFoundException('data not found');
        }
        return found;
     }
      //<---------------------------------edit project--------------------------------->

    async updateProject( post) {
        const found= await this.projectinforepository.findOne({relations:['projectassigns','technologyassigns']});
        if(!found){
            throw new NotFoundException('data not found');
           }
           
        // if (found.status==1) {
        //     throw new NotFoundException(`${id} is not exist`)
        // }
        //await this.projectinforepository.update(id, post)
        
        // post.ProjectTechnology.forEach(async element => {
            // console.log(element)
            let projectInfo=new Projectinfo()
            projectInfo['ProjectName']=post.ProjectName,
            projectInfo['ProjectScope']=post.ProjectScope,
            projectInfo['CompanyName']=post.CompanyName,
            projectInfo['ContactEmail']=post.ContactEmail,
            projectInfo['ContactName']=post.ContactName,
            projectInfo['ContactNumber']=post.ContactNumber,
            projectInfo['ProjectDurationDay']=post.ProjectDurationDay,
            projectInfo['ProjectDurationMonth']=post.ProjectDurationMonth,
            // projectInfo['projectinfoId']=element.projectinfoId;
            // projectInfo['projectinfoId']=element.id;
            // projectInfo['ProjectTechnology']=post.id;
           await this.projectinforepository.update(post.projectinfoId,projectInfo)
           console.log(post)
        
       post.ProjectTechnology.forEach(async(element:any)=>{
           let assign=new technologyassign();
           assign['projectinfoId']=element.projectinfoId;
           assign['id']=post.id;
           assign['ProjectTechnology']=element;
           const data=await this.techologyassignRepository.save(assign)
       })
       post.ProjectResources.forEach(async(element:any)=>{
        let proassign=new projectassign();
        proassign['projectinfoId']=element.projectinfoId;
        proassign['pid']=post.pid;
        proassign['ProjectResources']=element;
        const dataa=await this.projectassignRepository.save(proassign)
    })

        
        let msg = "Updated Succefully"
        return msg
        //return projectInfo;
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




