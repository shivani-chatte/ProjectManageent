import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { registration } from "./registration.entity";
import { sub_task } from "./sub_task.entity ";

@Entity()
export class subtaskassign{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    subtaskId:number;

    @Column({nullable:true})
    registrationId:number;


    @ManyToOne(()=>sub_task,(subtasks)=>subtasks.subtaskassigns)
     @JoinColumn({name:"subtaskId",referencedColumnName:"id"})
    subtasks:sub_task[]

    @ManyToOne(()=>registration,(registrations)=>registrations.subtaskassigns)
    @JoinColumn({name:"registrationId",referencedColumnName:"id"})
   registrations:registration[]


}