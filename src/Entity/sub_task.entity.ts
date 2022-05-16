import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString,IsInt, IsNotEmpty } from 'class-validator';
import { task } from "./task.entity";



@Entity()
export class subtask {

@PrimaryGeneratedColumn()
@IsInt()
@IsNotEmpty()
id: number;

 @Column()
 @IsString()
 @IsNotEmpty()
 sub_task: String;

 @Column()
 @IsString()
 @IsNotEmpty()
 user_name: string;

@Column({default:0})
status:number;


 @Column({nullable:true})
 task_id:number;

 @ManyToOne(() => task ,tasks => tasks.sub_tasks)
@JoinColumn({name:"task_id",referencedColumnName:"id"})
tasks:task[];
}