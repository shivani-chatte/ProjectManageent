import { Column, Entity, IsNull, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { registration } from "./registration.entity";
@Entity()
export class department {

 @PrimaryGeneratedColumn()
 @IsInt()
 @IsNotEmpty()
 id: number;

 
 @Column({default:''})
 @IsString()
 @IsNotEmpty()
 name: string;

 @Column({default:0})
 status: Number;

  @OneToMany(() => registration , registrations => registrations.departments)
  registrations: registration[];
}


