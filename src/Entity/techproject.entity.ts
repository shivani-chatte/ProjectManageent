import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TechProject{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    projectinfoId : number;

    @Column({nullable:true})
    technologyMasterId : number
}