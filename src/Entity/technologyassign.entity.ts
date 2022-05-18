import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { technology } from "./technology.entity";

@Entity()
export class technologyassign{
@PrimaryGeneratedColumn()
id:number;

@Column()
projectinfoId:number;

@Column()
ProjectTechnology:number;

@ManyToOne(() => Projectinfo ,projectinfos => projectinfos.technologyassigns)
@JoinColumn({name:"projectinfoId",referencedColumnName:"id"})
projectinfos:Projectinfo[];

@ManyToOne(()=> technology,(technologys)=>technologys.technologyassigns)
@JoinColumn({name:"ProjectTechnology",referencedColumnName:"id"})
technologys:technology[]

}
