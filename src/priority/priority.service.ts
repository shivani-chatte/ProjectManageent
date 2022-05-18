import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { priority } from 'src/Entity/priority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriorityService {
    constructor(
        @InjectRepository(priority)
        private readonly priorityrepository: Repository<priority>
        ){}
        //<--------------------------------------find all priority---------------------------------------->
       findAll(){
           return this.priorityrepository.find();
       }

}
