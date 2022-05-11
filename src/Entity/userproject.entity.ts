import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserProject{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    projectinfoId : number;

    @Column({nullable:true})
    registrationId : number
}