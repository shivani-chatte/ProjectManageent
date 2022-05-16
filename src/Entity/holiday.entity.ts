import { Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { registration } from "./registration.entity";

@Entity()
export class holiday{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    date: Date;

    @Column({nullable:true})
    registrationsId: number;

    @ManyToOne(() => registration , registrations => registrations.holidays)
    @JoinColumn({name : "registrationsId"})
    registrations: registration[];

}