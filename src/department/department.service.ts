import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { department } from 'src/Entity/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    dept(post: department) {
        throw new Error('Method not implemented.');
    }


    constructor (
        @InjectRepository(department)
        private deptrepository:Repository<department>
    ){}
    createdept(post:department){
        return this.deptrepository.save(post);
    }
    findOnePosts(id:number):Observable<department>{
       return from(this.deptrepository.findOne(id));
   
   }
   findAllPosts(){
       return from(this.deptrepository.find({where : {status :0}}));
   }
   updatedept(id:number,post:department){
         
       return from(this.deptrepository.update(id,post))
    }
    deletedept(id:number){
       return from (this.deptrepository.delete(id));   
   
   }
   }

