import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { registration } from 'src/Entity/registration.entity';
import { RegistrationService } from './registration.service';

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

  @Get()
  findAll(){
      return this.registrationService.findUser();
  }

  @Get(':id')
    @UsePipes(ValidationPipe)
    findOne(@Param('id') id: number){
        return this.registrationService.findOneUser(id);

    }

  @Put(':id')
    @UsePipes(ValidationPipe)
    update(
        @Param('id') id: number,
        @Body() userPost){
            return this.registrationService.update(id, userPost);
            
        }

  @Put('delete/:id')
  @UsePipes(ValidationPipe)
  delete(
      @Param('id') id: number){
          return this.registrationService.delete(id);
          
      }
  

}