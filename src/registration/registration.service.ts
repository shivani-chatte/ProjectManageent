import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { profile } from 'console';
//import { from } from 'rxjs';
import { department } from 'src/Entity/department.entity';
import { registration } from 'src/Entity/registration.entity';
import { user_type } from 'src/Entity/user_type.entity';
import { createQueryBuilder, Repository } from 'typeorm';
//import * as md5 from 'apache-md5'
const md5 = require("apache-md5");
import mime from 'mime';
import * as fs from 'fs';


@Injectable()
export class RegistrationService {
  constructor(//private readonly registrationService: RegistrationService,

    @InjectRepository(registration)
    private readonly RegRepository: Repository<registration>,
    @InjectRepository(user_type)
    private readonly UserTypeRepository: Repository<user_type>,
    @InjectRepository(department)
    private readonly DepartmentRepository: Repository<department>,
   
   
  ){}

  //-----------------Finding user-type from user-type entity------------//
  async getUserById(id): Promise<user_type>{
    let usertype=  await this.UserTypeRepository.findOne(id, {relations :['registrations']});
    if(!usertype){
      throw new NotFoundException(`${id} is not valid user type`)
    }
    return usertype;
  }

  //-----------------Finding user by it's user_name ----------------//
  async findbyUserName(user_name:string ) {
      let user = await this.RegRepository.findOne({user_name:user_name});
      
      return user;
    }

    //-----------------Finding user by it's email ----------------//
    async findbyEmail(email:string ) {
      let user = await this.RegRepository.findOne({email:email});
     
      return user;
    }

    //----------------- finding department from department entity-----------------//
  async getDepartmentById(id): Promise<department>{
    let department=  await this.DepartmentRepository.findOne(id, {relations :['registrations']});
    if(!department){
      throw new NotFoundException(`${id} is not valid department`)
    }
    return department;
  }

  

  //--------------------Add new user--------------------//
  async Add(registration, user_type:user_type, department:department){
    let encrptpassword
    if(registration.password){
      encrptpassword = md5(registration.password);
    }
    registration['password'] = encrptpassword

    await this.RegRepository.save(registration)
    let msg = "Added successfully"
    return msg

  }

  //---------------------Get user--------------------//
  async findUser(){
    const users = await createQueryBuilder("registration") 
                        .leftJoinAndSelect("registration.departments",'d')
                        .leftJoinAndSelect("registration.user_types",'ut')
                        .where({status:0})
                        .getMany()
    return users
  }

  //---------------------Find single user---------------------//
  async findOneUser(id){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    if(users.status==1){
      throw new NotFoundException(`${id} is not exist`)
    }
    return users
  }
  
  //--------------------Update user----------------------//
  async update(id: number, user: registration
    ){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    if(users.status==1){
      throw new NotFoundException(`${id} is not exist`)
    }

    let encrptpassword
    if(user.password){
      encrptpassword = md5(user.password);
    }
    user['password'] = encrptpassword
    
    await this.RegRepository.update(id, user)
    let msg = "Updated Successfully"
    return msg
  }
  
  //--------------------Update user in profile ----------------------//
  async updateprofile(id: number, user){
    const users = await this.RegRepository.findOne(id, { relations: ["departments", "user_types"] });
    if(!users){
      throw new NotFoundException(`${id} is not exist`)
    }
    if(users.status==1){
      throw new NotFoundException(`${id} is not exist`)
    }
    let imgProfilePath = ''

    if(user.hasOwnProperty('profile_img')){
      let matches= user.profile_img.match(/^data:(.+);base64,(.+)$/);
      let response:any={};
      if(!matches || matches.length !=3){
        return null;
      }
      if(!fs.existsSync('upload/profile')){
        fs .mkdirSync('upload/profile',{recursive:true});
  
      }
      response.type=matches[1];
      response.user=Buffer.from(matches[2],'base64');
      const buffer=Buffer.from(matches[2]);
      const file_size=(buffer.length /1e+6).toString();
      const file_name=(new Date()).getTime();
      const splitArray = matches[1].split('/');
      const file_path: string=`upload/profile/${file_name}.${splitArray[1]}`;
      let imgProfilePath=file_path;
      fs .writeFile(file_path,response.user,'base64',function(err){
        if(err)throw err
      })
      user['profile_path'] = imgProfilePath;
    }

    let encrptpassword=users.password;
        const isMatch=md5(user.password,encrptpassword) == encrptpassword;
        console.log(isMatch);
        if(!(users && isMatch)){
            
            return ("Password doesnot match");
        }
        
        if(user.newpassword !== user.confirmpassword){
            return "confirmpassword not match with password";

        }
      
        encrptpassword = md5(user.newpassword)
        user['password'] = encrptpassword
        
        await this.RegRepository.update(id,
          {firstname : user.firstname , 
            lastname : user.lastname , 
            address : user.address ,
            mobilenumber : user.mobilenumber,
            email : user.email,
            date_of_birth : user.date_of_birth,
            password : user.password,
            profile_path : user.profile_path
          });
        let msg = "Updated Successfully"
        return msg
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

  //-------------------finding leader----------------------------//
  async findleader(){
    const users = await createQueryBuilder("registration") 
                        .leftJoinAndSelect("registration.departments",'d')
                        .leftJoinAndSelect("registration.user_types",'ut')
                        .where({status:0, user_type : 4})
                        .getMany()
    return users
  }

}