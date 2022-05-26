import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString,IsInt, IsNotEmpty } from 'class-validator';
import { task } from "./task.entity";
import { history } from "./history.entity";
import { registration } from "./registration.entity";
import { category } from "./category.entity";
import { priority } from "./priority.entity";
import { subtaskassign } from "./subtaskassign.entity";



@Entity()
export class sub_task {

@PrimaryGeneratedColumn()
id: number;

 @Column()
 sub_task: String;

@Column({default:0})
status:number;

@Column({nullable:true})
 description: string;

 @Column({nullable:true})
 teamleadername: string;

 @Column({nullable:true})
 priority: string;

 @Column({nullable:true})
 category: string;

 @Column({nullable:true})
 start_date:Date;

 @Column({nullable:true})
 end_date:Date;

 @Column({nullable:true})
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

@OneToMany(() => history , historys  => historys.sub_task)
historys:history[];

@ManyToOne(() => category , categorys => categorys.subtasks)
@JoinColumn({name: "category"})
categorys: category[];

@ManyToOne(()=> priority, prioritys =>prioritys.subtasks)
@JoinColumn({name:"priority",referencedColumnName:"id"})
prioritys:priority[];

@OneToMany(() => subtaskassign,subtaskassigns => subtaskassigns.subtasks)
subtaskassigns: subtaskassign[];
}