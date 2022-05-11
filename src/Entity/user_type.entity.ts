import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { interns_college } from "./interns_college.entity";
import { registration } from "./registration.entity";

@Entity()
export class user_type{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    name:String;

    @Column({default:0})
    status: Number;

    @OneToMany(() => registration , registrations => registrations.user_types)
    registrations: registration[];

    @OneToOne(()=> interns_college, interns_colleges =>interns_colleges.user_types)
    interns_colleges:interns_college[];
}