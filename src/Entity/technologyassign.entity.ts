import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { technology } from "./technology.entity";

@Entity()
export class technologyassign{
@PrimaryGeneratedColumn()
id:number;

@Column()
projectId:number;

@Column()
technologyId:number;

@ManyToOne(() => Projectinfo ,projectinfos => projectinfos.technologyassigns)
@JoinColumn({name:"projectId",referencedColumnName:"id"})
projectinfos:Projectinfo[];

@ManyToOne(()=> technology,(technologys)=>technologys.technologyassigns)
@JoinColumn({name:"technologyId",referencedColumnName:"id"})
technologys:technology[]

}
