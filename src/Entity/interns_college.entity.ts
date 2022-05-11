import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { collegeinfo } from "./collegeinfo.entity";
import { user_type } from "./user_type.entity";

@Entity()
export class interns_college{
@PrimaryGeneratedColumn()
id:number;

@Column({"nullable":true})
user_id:number;

@Column({"nullable":true})
collegeid:number;

@OneToOne(()=> user_type, user_type =>user_type.interns_colleges)
@JoinColumn({name:"user_id",referencedColumnName:"id"})
user_types:user_type[];

@OneToOne(()=> collegeinfo, college_infos =>college_infos.intern_colleges)
@JoinColumn({name:"collegeid",referencedColumnName:"id"})
college_infos:collegeinfo[];

}