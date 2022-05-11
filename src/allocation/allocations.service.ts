import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< Updated upstream

import { UserProject } from 'src/Entity/userproject.entity';
import {  Repository } from 'typeorm';
=======
import { Projectinfo } from 'src/Entity/project_info.entity';
import { UserProject } from 'src/Entity/userproject';
import { registration } from 'src/Entity/registration.entity';
import { In, Repository } from 'typeorm';
>>>>>>> Stashed changes

@Injectable()
export class AllocationsService {
  constructor(
<<<<<<< Updated upstream
   
=======
    @InjectRepository(registration)
    private readonly RegRepository: Repository<registration>,
    @InjectRepository(Projectinfo)
    private readonly projectinforepository: Repository<Projectinfo>,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  

}
=======


  }





>>>>>>> Stashed changes

}
