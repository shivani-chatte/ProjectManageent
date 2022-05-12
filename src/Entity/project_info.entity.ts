import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { registration } from "./registration.entity";
import { task } from "./task.entity";
import { technology } from "./technology.entity";

@Entity()
export class Projectinfo{
    @PrimaryGeneratedColumn()
    id:Number;

   // @IsString()
    //@IsNotEmpty()
    //@Column({nullable:true})
    //project_name:String;

     //@IsString()
     //@Column({nullable:true})
    // technology:String;

    // @IsString()
    // @Column({nullable:true})
     //user:string;

    @IsString()
    @IsNotEmpty()
    @Column({nullable:true})
    ProjectName:string;

     @IsString()
     @Column({nullable:true})
     ProjectTechnology:String;

     @IsString()
     @Column({nullable:true})
     ProjectResources:string;

    
     @Column({'default':0})
     status:number;

     @Column({nullable:true})
     VenderName:string;
    
     @Column({nullable:true})
     Email:string;
     
     @Column({nullable:true})
     MobileNo:number;
     
     @Column({nullable:true})
     CompanyName:string;
    
     @Column({nullable:true})
     ProjectDuration:number;
     
     @Column({nullable:true})
     ProjectScope:string;

     @Column({nullable:true})
     registrationId:number;

     @Column({nullable:true})
     technologyId:number;
    

     @OneToMany(()=>task, (tasks)=>tasks.project_infos)
     tasks:task[]

     @ManyToOne(()=>registration,(registrations)=>registrations.projectinfos)
     @JoinColumn({name:"registrationId",referencedColumnName:"id"})
     registrations:registration[]

     @ManyToOne(()=>technology,(technologymasters)=>technologymasters.technologymasters)
    @JoinColumn({name:"technologyId",referencedColumnName:"id"})
    technologymasters:technology[]



    //@ManyToMany(() => registration, (registrations) =>registrations.project_infos)
    //@JoinTable({ name:'UserProject'})
    //registrations: registration[]

   // @ManyToMany(() => technology_master, (technologymasters) =>technologymasters.projectinfos)
    //@JoinTable({name:'TechProject'})
    //technologymasters: technology_master[]

    



}
    
