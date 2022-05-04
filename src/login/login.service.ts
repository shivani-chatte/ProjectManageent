import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { registration } from 'src/Entity/registration.entity';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(registration)
    private readonly RegRepository: Repository<registration>
    ){}

    
   /*async findByLogin({ name, password }: registration): Promise<registration> {    
    const user = await this.RegRepository.findOne({ where: { name } });
    
    if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
    }
    
    // compare passwords    
    const areEqual = await comparePassword(user.password, password);
    
    if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }
    
    return user;  
  }*/
  
}