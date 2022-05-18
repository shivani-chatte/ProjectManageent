import { Controller, Get } from '@nestjs/common';
import { TechnologyService } from './technology.service';

@Controller('technology')
export class TechnologyController {
    constructor(
        private readonly technologyservice:TechnologyService ){}
//<--------------------------------------find all technology---------------------------------------->
        @Get()
        get(){
            return this.technologyservice.findAll();
        }

}
