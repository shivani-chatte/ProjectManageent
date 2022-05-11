import { Body, Injectable, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Projectinfo } from 'src/Entity/project_info.entity';

import { Connection, createQueryBuilder, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProjectinfoService {


    constructor(
        @InjectRepository(Projectinfo)
        private projectinforepository: Repository<Projectinfo>
    ) { }

 //  <--------------------------addproject------------------------------------------->

    createproject(post: Projectinfo) {
        return this.projectinforepository.save(post);


    }
   
    //<-------------------------------view one project-------------------------------->

    findOnePosts(id: number): Observable<Projectinfo> {
        return from(this.projectinforepository.findOne(id));

    }
     //<-------------------------------view project----------------------------------->

    findAllPosts() {
        return from(this.projectinforepository.find());
    }

      //<---------------------------------edit project--------------------------------->

    updateProject(id: number, post: Projectinfo) {

        return from(this.projectinforepository.update(id, post))
    }
    
       //<-------------------------------deleteproject----------------------------------->

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

}




