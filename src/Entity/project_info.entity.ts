import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { registration } from "./registration.entity";
import { task } from "./task.entity";

@Entity()
export class Projectinfo{
    @PrimaryGeneratedColumn()
    id:Number;

    @IsString()
    @IsNotEmpty()
    @Column({nullable:true})
    project_name:String;

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
    

     @OneToMany(()=>task, (tasks)=>tasks.project_infos)
     tasks:task[]

    @ManyToMany(() => registration, (registrations) =>registrations.project_infos)
    @JoinTable({ name:'UserProject'})
    registrations: registration[]



}
    
