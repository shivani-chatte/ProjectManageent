import { UseGuards } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { registration } from "./registration.entity";
import { task } from "./task.entity";
import { technology } from "./technology.entity";
import { projectassign} from "./projectassign.entity";
import { technologyassign } from "./technologyassign.entity";
import { category } from "./category.entity";
import { priority } from "./priority.entity";

@Entity()
export class Projectinfo{
    @PrimaryGeneratedColumn()
    id:number;
     
     @Column({nullable:true})
     ContactEmail:String;

    // @IsString()
    @Column({nullable:true})
     ContactName:string;
     
     @Column({nullable:true})
     ContactNumber:string;
   


    // @IsString()
    // @IsNotEmpty()
    @Column({nullable:true})
    ProjectName:string;

    //  @IsString()
    //  @Column({nullable:true})
    //  ProjectTechnology:String;

    //  @IsString()
    //  @Column({nullable:true})
    //  ProjectResources:string;

    
     @Column({'default':0})
     status:number;


     @Column({nullable:true})
     CreatedAt:string;

     @Column({nullable:true})
     CompanyName:string;
    
     @Column({nullable:true})
     ProjectDurationMonth:number;

     @Column({nullable:true})
     ProjectDurationDay:number;
     
     @Column({nullable:true})
     ProjectScope:string;

    

     @OneToMany(()=>task, (tasks)=>tasks.project_infos)
     tasks:task[]

     /*@ManyToOne(()=>registration,(registrations)=>registrations.projectinfos)
     @JoinColumn({name:"registrationId",referencedColumnName:"id"})
     registrations:registration[]

     @ManyToOne(()=>technology,(technologymasters)=>technologymasters.projectinfos)
    @JoinColumn({name:"technologyId",referencedColumnName:"id"})
    technologymasters:technology[]*/
   
    @OneToMany(() => projectassign  , projectassigns  => projectassigns.projectinfos)
    projectassigns: projectassign[];

    @OneToMany(() => technologyassign  , technologyassigns  => technologyassigns.projectinfos)
    technologyassigns: technologyassign[];

}
    
