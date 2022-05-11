import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { sub_task } from "./sub_task.entity";

@Entity()
export class task{
    @PrimaryGeneratedColumn()
    id:number;

   // @Column()
    //project_name:string;

    @Column()
    task_name:string; 

    @Column()
    from_date:Date;

    @Column()
    to_date:Date;

    @Column()
    project_id:number;

    @Column({default:0})
    status:number;

    @OneToMany(() => sub_task,sub_tasks => sub_tasks.tasks)

    sub_tasks: sub_task[];

    @ManyToOne(() => Projectinfo,project_infos => project_infos.tasks)
    @JoinColumn({name:"project_id",referencedColumnName:"id"})
    project_infos:Projectinfo[];
}