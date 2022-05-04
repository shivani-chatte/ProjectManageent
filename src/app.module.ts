import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { department } from './Entity/department.entity';
import { registration } from './Entity/registration.entity';
import { user_type } from './Entity/user_type.entity';
import { AuthService } from './login/auth.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegistrationController } from './registration/registration.controller';
import { RegistrationService } from './registration/registration.service';

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
    TypeOrmModule.forFeature([registration, user_type, department])
],
  controllers: [AppController, LoginController,RegistrationController],
  providers: [AppService, LoginService, RegistrationService, AuthService],
})
export class AppModule {}
