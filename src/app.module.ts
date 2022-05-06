import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { department } from './Entity/department.entity';
import { registration } from './Entity/registration.entity';
import { user_type } from './Entity/user_type.entity';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';
import { ResetController } from './reset/reset.controller';
import { ResetService } from './reset/reset.service';
import { UpdatePasswordController } from './update/updatepassword.controller';
import { UpdatePasswordService } from './update/updatepassword.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Sonu@123",
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
    TypeOrmModule.forFeature([registration, user_type, department]),
  
],
  controllers: [AppController, RegistrationController, LoginController, ResetController, UpdatePasswordController, MailController],
  providers: [AppService, RegistrationService, LoginService, ResetService, UpdatePasswordService, MailService],
})
export class AppModule {}
