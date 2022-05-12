import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
//import { ProjectinfoService } from "./projectinfo/projectinfo.service";
import { Projectinfo } from "./project_info.entity";
import { registration } from "./registration.entity";


    @Entity()
    export class technology{
        @PrimaryGeneratedColumn()
        id:number;
    
        @Column({nullable:true})
        name:string;
    
        @Column({nullable:true})
        status:number;

        //@ManyToMany(()=> registration,(registrations) => registrations.technologymasters)
        //registrations: registration[]

      // @ManyToMany(()=> Projectinfo,(projectinfos) => projectinfos.technologymasters)
       //projectinfos: Projectinfo[]

       @OneToMany(() => Projectinfo ,projectinfos => projectinfos.technologymasters)
       technologymasters:Projectinfo[];
     
    }

    

    
    