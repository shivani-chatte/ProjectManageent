import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { ProjectinfoService } from 'src/projectinfo/projectinfo.service';
// import { Projectinfo } from 'src/project_info.entity';
// import { registration } from 'src/registration.entity';
// import { RegistrationService } from 'src/registrations/registrations.service ';
import { AllocationsService } from './allocations.service';

@Controller('allocation')
export class AllocationController {
     constructor ( //private readonly registrationService: RegistrationService,
    //     private readonly projectinfoservice:ProjectinfoService,
        private readonly allocationservice:AllocationsService) {}

/*@Post()
async save(@Body() projectinfo:Projectinfo){
    
    return await this.allocationservice.Allocate(Projectinfo);
  }*/
  // @Get(':id')
  // async findbyProjectId(@Param('id')id:number){
  // return  await this.projectinfoservice.findOnePosts(id);
  // }
  @Post()
  async save(@Body() Projectinfo){
      return await this.allocationservice.allocateproject(Projectinfo);
  }

}
