import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class history{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    teamleaderid:number;

    @Column()
    currentuser:string;

    @Column()
    newuser:string;

}