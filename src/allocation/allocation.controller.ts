import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Projectinfo } from 'src/Entity/project_info.entity';
import { ProjectinfoService } from 'src/project/projectinfo.service';
import { RegistrationService } from '../Authentication/registration/registration.service';

import { AllocationsService } from './allocations.service';

@Controller('allocation')
export class AllocationController {
     constructor (
        private readonly allocationservice:AllocationsService) {}



  @Post()
  async create(@Body() Projectinfo){
    return await this.allocationservice.allocateproject(Projectinfo)
  }
  
 
}
