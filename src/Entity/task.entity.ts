import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { category } from "./category.entity";
import { priority } from "./priority.entity";
import { Projectinfo } from "./project_info.entity";
import { sub_task } from "./sub_task.entity ";
import { taskassign } from "./taskassign.entity";


@Entity()
export class task{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    TaskName:string;

    @Column({nullable:true})
    project_id:number;

    @Column({nullable:true})
    Priority: string;

    @Column({nullable:true})
    Category: string;

    @Column({nullable:true})
    TaskDescription: string;

    @Column({nullable:true})
    TaskDuration: number;

    @Column({default:0})
    Status:number;

    @OneToMany(() => sub_task,sub_tasks => sub_tasks.tasks)
    sub_tasks: sub_task[];

    @Column({nullable:true})
    category:number;


    @Column({nullable:true})
    priority:number;


    @ManyToOne(() => Projectinfo , project_infos => project_infos.tasks)
    @JoinColumn({name:"project_id",referencedColumnName:"id"})
    project_infos : Projectinfo[];

    @OneToMany(() => sub_task,subtasks => subtasks.tasks)
     subtasks: sub_task[];

     @ManyToOne(() => category , categorys => categorys.tasks)
     @JoinColumn({name: "category"})
     categorys: category[];
 
     @OneToOne(()=> priority, prioritys =>prioritys.tasks)
     @JoinColumn({name:"priority",referencedColumnName:"id"})
     prioritys:priority[];

     @OneToMany(() => taskassign,taskassigns => taskassigns.tasks)
     taskassigns: taskassign[];

 
}