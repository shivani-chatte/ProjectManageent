import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { task } from "./task.entity";
import { registration } from "./registration.entity";

@Entity()
export class taskassign{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    taskId:number;

    @Column({nullable:true})
    TaskResource:number;


    @ManyToOne(()=>task,(tasks)=>tasks.taskassigns)
     @JoinColumn({name:"taskId",referencedColumnName:"id"})
    tasks:task[]

    @ManyToOne(()=>registration,(registrations)=>registrations.taskassigns)
    @JoinColumn({name:"TaskResource",referencedColumnName:"id"})
   registrations:registration[]


    
}