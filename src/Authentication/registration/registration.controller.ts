import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import { registration } from 'src/Entity/registration.entity';
import { Helper } from './helper';
import { RegistrationService } from './registration.service';
import {diskStorage} from 'multer';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4} from 'uuid'; 
import { platform } from 'os';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() registration: registration){
    const usertype = await this.registrationService.getUserById(registration.user_type);
    const department = await this.registrationService.getDepartmentById(registration.department);
    return await this.registrationService.Add(registration,usertype,department);
  }

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file',{
//     storage: diskStorage({
//         destination: './uploads/profileimages',

//     })
//   }))
//   uploadfile(@UploadedFile() file): Observable<object>{
//       return of({imagePath: file.path});

//   }


  @Get()
  findAll(){
      return this.registrationService.findUser();
  }

  @Get(':user_name')
  find(@Param('user_name') user_name: string){
      return this.registrationService.findbyUserName(user_name);
  }

  @Get('email/:email')
  findmail(@Param('email') email: string){
      return this.registrationService.findbyEmail(email);
  }

  @Get(':id')
    @UsePipes(ValidationPipe)
    findOne(@Param('id') id: number){
        return this.registrationService.findOneUser(id);

    }

  @Put(':id')
      update(
        @Param('id') id: number,
        @Body() userPost: registration){
            return this.registrationService.update(id, userPost);
            
        }

  @Put('delete/:id')
  @UsePipes(ValidationPipe)
  delete(
      @Param('id') id: number){
          return this.registrationService.delete(id);
          
      }



  

}


