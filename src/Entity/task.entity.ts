import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { subtask } from "./sub_task.entity";

@Entity()
export class task{
    @PrimaryGeneratedColumn()
    @IsInt()
    @IsNotEmpty()
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

    @Column({default:0})
    status:number;

    @ManyToOne(() => Projectinfo , project_infos => project_infos.tasks)
    @JoinColumn({name:"project_id",referencedColumnName:"id"})
    project_infos : Projectinfo[];

    @OneToMany(() => subtask,subtasks => subtasks.tasks)
     subtasks: subtask[];
}