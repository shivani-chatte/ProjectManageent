import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { registration } from "./registration.entity";

import { sub_task } from "./sub_task.entity ";

@Entity()
export class history{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    subtask_id:number;

    @Column({nullable:true})
    user_id: number;

    @Column({nullable:true})
    newuser_id:number;

    @ManyToOne(() => sub_task , sub_tasks  => sub_tasks.historys)
    @JoinColumn({name: "subtask_id"})
    sub_tasks: sub_task[];

    @ManyToOne(() => registration  , registrations  => registrations.historys)
    @JoinColumn({name: "user_id"})
    registrations: registration[];

    @ManyToOne(() => registration  , regs  => regs.historys)
    @JoinColumn({name: "newuser_id"})
    regs: registration[];

    @ManyToOne(() => registration  , Reg  => Reg.historys)
    @JoinColumn({name: "admin_id"})
    Reg: registration[];


}