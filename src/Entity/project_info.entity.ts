import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import {projectassign } from "./projectassign.entity";
import { registration } from "./registration.entity";
import { task } from "./task.entity";
import { technology } from "./technology.entity";
import { technologyassign } from "./technologyassign.entity";

@Entity()
export class Projectinfo{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column({nullable:true})
    ProjectName:string;

    
     @Column({'default':0})
     status:number;

     @Column({nullable:true})
     VenderName:string;
    
     @Column({nullable:true})
     Email:string;
     
     @Column({nullable:true})
     MobileNo:number;

     @Column({nullable:true})
     CreatedAt:Date;

     @Column({nullable:true})
     EndAt:Date;
     
     @Column({nullable:true})
     CompanyName:string;
    
     @Column({nullable:true})
     ProjectDurationMonth:number;

     @Column({nullable:true})
     ProjectDurationDays:number;
     
     @Column({nullable:true})
     ProjectScope:string;

     @Column({nullable:true})
     registrationId:number;

     @Column({nullable:true})
     technologyId:number;
    

     @OneToMany(()=>task, (tasks)=>tasks.project_infos)
     tasks:task[]

    //  @ManyToMany(()=>registration,(registrations)=>registrations.projectinfos)
    //  @JoinTable({name:"AssignProject"})
    //  registrations:registration[]

     @OneToMany(()=>technologyassign,(technologyassigns)=>technologyassigns.projectinfos)
     technologyassigns:technologyassign[]

    @OneToMany(() => projectassign , projectassigns  => projectassigns.projectinfos)
    projectassigns: projectassign[];


    



}
    
