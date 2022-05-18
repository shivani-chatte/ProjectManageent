import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from "typeorm";
//import { ProjectinfoService } from "./projectinfo/projectinfo.service";
import { Projectinfo } from "./project_info.entity";
import { registration } from "./registration.entity";
import { technologyassign } from "./technologyassign.entity";


    @Entity()
    export class technology{
        @PrimaryGeneratedColumn()
        id:number;
    
        @Column({nullable:true})
        name:string;
    
        @Column({nullable:true})
        status:number;

        @OneToMany(()=> technologyassign,(technologyassigns)=>technologyassigns.technologys)
        technologyassigns:technologyassign[]
    
     
    }

    

    
    