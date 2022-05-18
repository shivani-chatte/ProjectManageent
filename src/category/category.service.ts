import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { category } from 'src/Entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(category)
        private readonly categoryrepository: Repository<category>
        ){}
       findAll(){
           return this.categoryrepository.find();
       }

}
