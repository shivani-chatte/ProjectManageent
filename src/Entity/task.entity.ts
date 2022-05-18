import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { sub_task } from "./sub_task.entity ";
import { taskassign } from "./taskassign.entity";


@Entity()
export class task{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @IsNotEmpty()
    task_name:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    from_date:Date;

    @Column()
    @IsString()
    to_date:Date;

    @Column()
    project_id:number;

    @Column({nullable:true})
    teamleadername: string;

    @Column({nullable:true})
    priority: string;

    @Column({nullable:true})
    category: string;

    @Column({nullable:true})
    description: string;

    @Column({nullable:true})
    duration: number;

    @Column({default:0})
    status:number;

    @OneToMany(() => sub_task,sub_tasks => sub_tasks.tasks)
    sub_tasks: sub_task[];

    @ManyToOne(() => Projectinfo,project_infos => project_infos.tasks)
    @JoinColumn({name:"project_id",referencedColumnName:"id"})
    project_infos : Projectinfo[];

    @OneToMany(() => taskassign , taskassigns  => taskassigns.tasks)
    taskassigns: taskassign[];

   
}