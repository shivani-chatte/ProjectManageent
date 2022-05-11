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
import { Projectinfo } from './Entity/project_info.entity';
import { task } from './Entity/task.entity';
import { subtask } from './Entity/sub_task.entity';
import { collegeinfo } from './Entity/collegeinfo.entity';
import { interns_college } from './Entity/interns_college.entity';
import { AllocationController } from './allocation/allocation.controller';
import { AllocationsService } from './allocation/allocations.service';
import { UserProject } from './Entity/userproject';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "vinaya2605",
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
    TypeOrmModule.forFeature([registration, user_type, department,subtask,task,Projectinfo,UserProject])],
  controllers: [AppController, RegistrationController, LoginController, ResetController, MailController, TaskController,AllocationController],
  providers: [AppService, RegistrationService, LoginService, ResetService,  MailService, TaskService,AllocationsService],
})
export class AppModule {}
