import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { department } from "./department.entity";
import { user_type } from "./user_type.entity";
import * as bcrypt from 'bcrypt';
import { Projectinfo } from "./project_info.entity";
var crypto = require('crypto');


@Entity()
export class registration{
    
    @PrimaryGeneratedColumn()
    id : Number;

    @Column({default:''})
    @IsString()
    @IsNotEmpty()
    name: String;

    @Column({default:''})
    @IsString()
    @IsNotEmpty()
    address: String;

    @Column({length:10, nullable:true})
    @IsNotEmpty()
    mobilenumber: String;

    @Column({nullable:true})
    date_of_birth: Date;

    @Column({nullable:true})
    profile_img: String;

    @Column()
    @IsNotEmpty()
    @IsEmail({unique: true})
    email: String;

    @Column()
    @IsNotEmpty()
    department: Number;

    @Column()
    @IsNotEmpty()
    user_type: Number;

    @Column({unique: true})
    @IsNotEmpty()
    user_name: string;

    @Column({nullable: true})
    @IsNotEmpty()
    password: string;

    @Column({default:0})
    status: Number;

    
    @ManyToOne(() => department , departments => departments.registrations)
    @JoinColumn({name: "department"})
    departments: department[];

    @ManyToOne(() => user_type , user_types => user_types.registrations)
    @JoinColumn({name: "user_type"})
    user_types: user_type[];

     @ManyToMany(() => Projectinfo, (project_infos) => project_infos.registrations)
     project_infos: Projectinfo[]
    
}



