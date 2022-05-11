<<<<<<< Updated upstream:src/Authentication/registration/registration.controller.ts
import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
=======
import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
>>>>>>> Stashed changes:src/registration/registration.controller.ts
import { registration } from 'src/Entity/registration.entity';
import { RegistrationService } from './registration.service';
<<<<<<< Updated upstream:src/Authentication/registration/registration.controller.ts
import {diskStorage} from 'multer';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4} from 'uuid'; 
import { platform } from 'os';
=======
>>>>>>> Stashed changes:src/registration/registration.controller.ts

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async save(@Body() registration){
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
<<<<<<< Updated upstream:src/Authentication/registration/registration.controller.ts
        @Body() userPost: registration){
            return this.registrationService.update(id, userPost);
            
=======
        @Body() userPost){
            return this.registrationService.update(id, userPost);    
        }


  @Put('profile/:id')
    @UsePipes(ValidationPipe)
    updateprofile(
        @Param('id') id: number,
        @Body() userPost){
            return this.registrationService.updateprofile(id, userPost);    
>>>>>>> Stashed changes:src/registration/registration.controller.ts
        }

  @Put('delete/:id')
  @UsePipes(ValidationPipe)
  delete(
      @Param('id') id: number){
          return this.registrationService.delete(id);
          
      }

}


