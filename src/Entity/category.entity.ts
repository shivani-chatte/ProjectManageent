import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { sub_task } from "./sub_task.entity ";
import { task } from "./task.entity";

@Entity()
export class category{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;

    @OneToMany(() => task  , tasks  => tasks.categorys)
    tasks: task[];

    @OneToMany(() => sub_task  , subtasks  => subtasks.categorys)
    subtasks: sub_task[];


}