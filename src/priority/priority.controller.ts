import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';

@Controller('priority')
export class PriorityController {
    constructor(
        private readonly priorityservice:PriorityService ){}

        @Get()
        get(){
            return this.priorityservice.findAll();
        }

}
