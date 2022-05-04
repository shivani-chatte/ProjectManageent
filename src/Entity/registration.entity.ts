import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { department } from "./department.entity";
import { user_type } from "./user_type.entity";



@Entity()
export class registration{
    @PrimaryGeneratedColumn()
    id : Number;

    @Column({default:'', unique: true})
    @IsString()
    @IsNotEmpty()
    name: String;

    @Column({default:''})
    @IsString()
    @IsNotEmpty()
    address: String;

    @Column()
    @MaxLength(10)
    @IsNotEmpty()
    mobilenumber: String;

    @Column()
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
    user_name: String;

    @Column({nullable: true})
    @IsNotEmpty()
    password: String;

    @Column({default:0})
    @IsNotEmpty()
    status: Number;

    

    @ManyToOne(() => department , departments => departments.registrations)
    @JoinColumn({name: "department"})
    departments: department[];

    @ManyToOne(() => user_type , user_types => user_types.registrations)
    @JoinColumn({name: "user_type"})
    user_types: user_type[];
    
}

