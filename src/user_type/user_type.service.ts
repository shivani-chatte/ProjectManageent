import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { user_type } from 'src/Entity/user_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTypeService {
    constructor(
        @InjectRepository(user_type)
        private readonly usertypeRepository: Repository<user_type>){}

    findall(){
        return this.usertypeRepository.find();
    }
}
