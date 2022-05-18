import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { department } from "./department.entity";
import { holiday } from "./holiday.entity";
import { projectassign } from "./projectassign.entity";
import { sub_task } from "./sub_task.entity ";
import { user_type } from "./user_type.entity";
import { history } from "./history.entity";
import { taskassign } from "./taskassign.entity";


var crypto = require('crypto');


@Entity()
export class registration{
    
    @PrimaryGeneratedColumn()
    id : Number;

    @Column({default:''})
    @IsString()
    @IsNotEmpty()
    firstname: String;

    @Column({default:''})
    @IsString()
    @IsNotEmpty()
    lastname: String;

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

    @Column({nullable:true})
    profile_path: String;

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

    @OneToMany(() => holiday , holidays => holidays.registrations)
    holidays: holiday[];

    @OneToMany(() => projectassign ,projectassigns => projectassigns.registrations)
    projectassigns:projectassign[];

    @ManyToOne(() => sub_task, sub_tasks=> sub_tasks.registrations)
    sub_tasks:sub_task[];

    @OneToMany(() => history, historys  => historys.registrations)
    historys: history[];

    @OneToMany(() => history , his  => his.regs)
    his: history[];

    @OneToMany(() => history , His  => His.Reg)
    His: history[]; 
    
    @OneToMany(() => taskassign , taskassigns  => taskassigns.registrations)
    taskassigns: taskassign[];


}



