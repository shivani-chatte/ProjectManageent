import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserProject } from 'src/Entity/userproject.entity';
import {  Repository } from 'typeorm';

@Injectable()
export class AllocationsService {
  constructor(
   
    @InjectRepository(UserProject)
    private readonly UserProjectRepository: Repository<UserProject>

  ) { }


  async allocateproject(project) {

    let users = project.userid
    users.forEach(element => {
      let Projectinfo = new UserProject()
      Projectinfo['projectinfoId'] = project.projectid
      Projectinfo['registrationId'] = element

       this.UserProjectRepository.save(Projectinfo)
    });
    return project
  

}

}
