import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsString,IsInt, IsNotEmpty } from 'class-validator';
import { task } from "./task.entity";
import { history } from "./history.entity";
import { registration } from "./registration.entity";



@Entity()
export class sub_task {

@PrimaryGeneratedColumn()
//@IsInt()
//@IsNotEmpty()
id: number;

 @Column()
 //@IsString()
 //@IsNotEmpty()
 sub_task: String;

//  @Column({})
//  @IsString()
//  @IsNotEmpty()
//  user_name: string;

@Column({default:0})
status:number;

@Column({nullable:true})
// @IsString()
// @IsNotEmpty()
 description: string;

 @Column({nullable:true})
 teamleadername: string;

 @Column({nullable:true})
 //@IsString()
 //@IsNotEmpty()
 start_date:Date;

 @Column({nullable:true})
//@IsString()
 //@IsNotEmpty()
 end_date:Date;

 @Column({nullable:true})
 //@IsString()
 //@IsNotEmpty()
 duration: number;

 @Column({nullable:true})
 totaltime:number;

 @Column({nullable:true})
 task_id:number;

 @Column({nullable:true})
 user_id:number;

 @ManyToOne(() => task ,tasks => tasks.sub_tasks)
@JoinColumn({name:"task_id",referencedColumnName:"id"})
tasks:task[];

@ManyToOne(() => registration, registrations=> registrations.sub_tasks)
@JoinColumn({name:"user_id",referencedColumnName:"id"})
registrations:registration[];

@OneToMany(() => history , historys  => historys .sub_tasks)
historys:history[];

}