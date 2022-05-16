import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity(/*{synchronize:false}*/)
export class AssignProject{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    projectinfoId : number;

    @Column({nullable:true})
    registrationId : number
}