import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { technology } from 'src/Entity/technology.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechnologyService {
    constructor(
        @InjectRepository(technology)
        private readonly technologyRepository: Repository<technology>
        ){}
        //<--------------------------------------find all technology---------------------------------------->

       findAll(){
           return this.technologyRepository.find();
       }


    

}
