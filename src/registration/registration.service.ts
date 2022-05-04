import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { department } from 'src/Entity/department.entity';
import { registration } from 'src/Entity/registration.entity';
import { user_type } from 'src/Entity/user_type.entity';
import { AuthService } from 'src/login/auth.service';
import { Repository } from 'typeorm';

var crypto = require('crypto');

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(registration)
    private readonly RegRepository: Repository<registration>,
    @InjectRepository(user_type)
    private readonly UserTypeRepository: Repository<user_type>,
    @InjectRepository(department)
    private readonly DepartmentRepository: Repository<department>,
    private authService : AuthService,
  ){}

  async getUserById(id): Promise<user_type>{
    let usertype=  await this.UserTypeRepository.findOne(id, {relations :['registrations']});
    if(!usertype){
      throw new NotFoundException(`${id} is not valid user type`)
    }
    return usertype;
  }

  async getDepartmentById(id): Promise<department>{
    let department=  await this.DepartmentRepository.findOne(id, {relations :['registrations']});
    if(!department){
      throw new NotFoundException(`${id} is not valid department`)
    }
    return department;
  }

  

  //--------------------Add new user--------------------//
  async Add(registration:registration, user_type:user_type, department:department){
    let encrptpassword
    if(registration.password){
      encrptpassword = await  crypto.createHash('md5').update(registration.password).digest('hex');
    }
  
    registration['password'] = encrptpassword
    return await this.RegRepository.save(registration)
  
  }

  //---------------------Get user--------------------//
  async findUser(){
    const users = await this.RegRepository.find({ relations: ["departments", "user_types"] });
    return users
  }

  //---------------------Find single user---------------------//
  async findOneUser(id){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    return users
  }
  
  //--------------------Update user----------------------//
  async update(id: number, user: registration){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    return await this.RegRepository.update(id, user);
  }

  //--------------------- Delete User---------------------//
  async delete(id: number){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    users.status = 1
    return await this.RegRepository.update(id, {
      ...(users.status && { status: 1 })});
  }

}