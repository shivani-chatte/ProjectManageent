import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { department } from './Entity/department.entity';
import { registration } from './Entity/registration.entity';
import { user_type } from './Entity/user_type.entity';
import { LoginController } from './Authentication/login/login.controller';
import { LoginService } from './Authentication/login/login.service';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { ResetController } from './Authentication/reset/reset.controller';
import { ResetService } from './Authentication/reset/reset.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './Authentication/mail/mail.controller';
import { MailService } from './Authentication/mail/mail.service';
import { task } from './Entity/task.entity';
import { Projectinfo } from './Entity/project_info.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { technology } from './Entity/technology.entity';
import { ProjectinfoController } from './project/projectinfo.controller';
import { ProjectinfoService } from './project/projectinfo.service';
import { sub_task } from './Entity/sub_task.entity ';
import { AssignProject } from './Entity/AssignProject.entity';
import { projectassign } from './Entity/projectassign.entity';
import { technologyassign } from './Entity/technologyassign.entity';
import { history } from './Entity/history.entity';
import { SubTaskService } from './subtask/sub_task.service';
import { SubTaskController } from './subtask/sub_task.controller';
import { UserTypeService } from './user_type/user_type.service';
import { UserTypeController } from './user_type/user_type.controller';
import { holiday } from './Entity/holiday.entity';
import { HolidayController } from './holiday/holiday.controller';
import { HolidayService } from './holiday/holiday.service';
import { interns_college } from './Entity/interns_college.entity';
import { collegeinfo } from './Entity/collegeinfo.entity';
import { taskassign } from './Entity/taskassign.entity';

import { category } from './Entity/category.entity';
import { priority } from './Entity/priority.entity';
import { subtaskassign } from './Entity/subtaskassign.entity';




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
    TypeOrmModule.forFeature([registration, user_type, department,sub_task,task,Projectinfo,technology,AssignProject,projectassign,technologyassign,history, holiday, interns_college, collegeinfo,category,priority,taskassign,subtaskassign])],
  controllers: [AppController, RegistrationController, LoginController, ResetController, MailController, TaskController,ProjectinfoController,SubTaskController, UserTypeController, HolidayController],
  providers: [AppService,RegistrationService, LoginService, ResetService, MailService, TaskService,ProjectinfoService,SubTaskService, UserTypeService, HolidayService],
})
export class AppModule {}