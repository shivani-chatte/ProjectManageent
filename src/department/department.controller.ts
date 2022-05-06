import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { department } from 'src/Entity/department.entity';
import { DeleteResult } from 'typeorm';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    
        constructor( private readonly departmentservice:DepartmentService){}
    

        @Post()
        createdata(@Body() post:department){
          return this.departmentservice.dept(post);
        }
        @Get()
        find(@Body()post:department){
            return this.departmentservice.findAllPosts();
        }
        @Get(':id')
        findOne(@Param('id') id:number){
            return this.departmentservice.findOnePosts(id)
    
                
        }
        @Put(':id')
        update(
            @Param('id') id:number,
        @Body()post:department 
        ){
            return this.departmentservice.updatedept(id,post);
    
    
        }
        @Delete(':id')
        delete(@Param('id')id:number):Observable<DeleteResult>{
         return this.departmentservice.deletedept(id)
    ;   
        }
}
