import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}