import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { sub_task } from "./sub_task.entity ";
import { task } from "./task.entity";

@Entity()
export class priority{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    @OneToOne(() =>task  , tasks  => tasks.prioritys)
    tasks: task[];

    @OneToOne(() =>sub_task  , subtasks  => subtasks.prioritys)
    subtasks: sub_task[];

    
}