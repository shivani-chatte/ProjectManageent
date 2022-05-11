import { Column,Entity,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { interns_college } from "./interns_college.entity";
@Entity()
export class collegeinfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({"nullable":true})
    name:string;

    @Column({"nullable":true})
    contactno:number;

    @Column({"nullable":true})
    address:string;

    @OneToOne(()=> interns_college, intern_colleges =>intern_colleges.college_infos)
    intern_colleges:interns_college[];

    @OneToOne(()=> collegeinfo, college_infos =>college_infos.intern_colleges)
   college_infos:collegeinfo[];

}

