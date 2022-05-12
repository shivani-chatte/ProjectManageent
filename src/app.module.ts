import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { department } from './Entity/department.entity';
import { registration } from './Entity/registration.entity';
import { user_type } from './Entity/user_type.entity';
import { LoginController } from './Authentication/login/login.controller';
import { LoginService } from './Authentication/login/login.service';

import { RegistrationService } from './registration/registration.service';
import { ResetController } from './Authentication/reset/reset.controller';
import { ResetService } from './Authentication/reset/reset.service';
//import { UpdatePasswordController } from './update/updatepassword.controller';
import { UpdatePasswordService } from './update/updatepassword.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { MailController } from './mail/mail.controller';
// import { MailService } from './mail/mail.service';
//import { sub_task } from './Entity/sub_task.entity';
import { task } from './Entity/task.entity';
import { Projectinfo } from './Entity/project_info.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { UserProject } from './Entity/userproject.entity';
import { AllocationController } from './allocation/allocation.controller';
import { AllocationsService } from './allocation/allocations.service';
import { TechProject } from './Entity/techproject.entity';
import { TechController } from './tech/tech.controller';
import { TechService } from './tech/tech.service';
import { technology } from './Entity/technology.entity';
import { RegistrationController } from './registration/registration.controller';
import { subtask } from './Entity/sub_task.entity';
import { MailService } from './Authentication/mail/mail.service';
import { MailController } from './Authentication/mail/mail.controller';
import { interns_college } from './Entity/interns_college.entity';
import { collegeinfo } from './Entity/collegeinfo.entity';
import { history } from './Entity/history.entity';
import { ProjectinfoController } from './project/projectinfo.controller';
import { ProjectinfoService } from './project/projectinfo.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';




@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "komaljadhav",
    database: "ProjectManagement",
    synchronize: true,
    logging: false,
    autoLoadEntities: true}),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          // host: "smtp.mailtrap.io",
          service:"gmail",
          port: 2525,
          secure: false,
          auth: {
            user: "sapanamali016@gmail.com",
             pass:"Sam@1998"
          },
        },
        defaults: {
          from: '<sendgrid_from_email_address>'
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false
          },
        
        }
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([registration, user_type, department,subtask,task,Projectinfo,UserProject,TechProject,technology,interns_college,collegeinfo,history])],
  controllers: [AppController, RegistrationController, LoginController, ResetController,  MailController, TaskController,AllocationController,TechController,ProjectinfoController,HistoryController],
  providers: [AppService, RegistrationService, LoginService, ResetService, UpdatePasswordService, MailService, TaskService,AllocationsService,TechService,ProjectinfoService,HistoryService],
})
export class AppModule {}
