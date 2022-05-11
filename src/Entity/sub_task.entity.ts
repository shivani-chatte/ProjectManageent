import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString,IsInt, IsNotEmpty } from 'class-validator';
import { task } from "./task.entity";


@Entity()
export class sub_task {

@PrimaryGeneratedColumn()
@IsInt()
@IsNotEmpty()
id: number;

 @Column()
 @IsString()
 @IsNotEmpty()
 project_name: string;


 @Column()
 @IsString()
 @IsNotEmpty()
 task_name: string;

 @Column()
 @IsString()
 @IsNotEmpty()
 sub_task: string;

 @Column()
 @IsString()
 @IsNotEmpty()
 user_name: string;

 @ManyToOne(() => task ,tasks => tasks.sub_tasks)
@JoinColumn({name:"task_id",referencedColumnName:"id"})
tasks:task[];
}