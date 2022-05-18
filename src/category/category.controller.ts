import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryservice:CategoryService ){}

        @Get()
        get(){
            return this.categoryservice.findAll();
        }

}
