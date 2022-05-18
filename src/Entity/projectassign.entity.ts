import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projectinfo } from "./project_info.entity";
import { registration } from "./registration.entity";

@Entity()
export class projectassign{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    projectinfoId:number;

    @Column({nullable:true})
    ProjectResources:number;



    @ManyToOne(()=>Projectinfo,(projectinfos)=>projectinfos.projectassigns)
     @JoinColumn({name:"projectinfoId",referencedColumnName:"id"})
    projectinfos:Projectinfo[]

    @ManyToOne(()=>registration,(registrations)=>registrations.projectassigns)
    @JoinColumn({name:"ProjectResources",referencedColumnName:"id"})
   registrations:registration[]


    
}