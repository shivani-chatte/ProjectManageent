import { IsNotEmpty, IsString } from "class-validator";
<<<<<<< Updated upstream
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
=======
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

     @IsString()
     @Column({nullable:true})
     technology:String;

     @IsString()
     @Column({nullable:true})
     user:string;
>>>>>>> Stashed changes

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
    
<<<<<<< Updated upstream
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



=======
     @Column({'default':0})
     status:number;


     @OneToMany(()=>task,(tasks)=>tasks.project_infos)
     tasks:task[]

    @ManyToMany(() => registration, (registrations) =>registrations.projectinfos)
    @JoinTable({ name: 'UserProject' })
    registrations: registration[]

>>>>>>> Stashed changes
}
    
