import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TechProject } from "src/Entity/techproject.entity";
import { Repository } from "typeorm";

@Injectable()
export class TechService {
  constructor(
   
    @InjectRepository(TechProject)
    private readonly TechProjectRepository: Repository<TechProject>

  ) { }


  async allocatetechnology(technique) {

    let project = technique.projectid
    project.forEach(element => {
      let Projectinfo = new TechProject()
      Projectinfo['projectinfoId'] = technique.projectid
      Projectinfo['technologyMasterId'] = element

       this.TechProjectRepository.save(Projectinfo)
    });
    return technique
  
  }
}
