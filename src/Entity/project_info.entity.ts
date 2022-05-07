import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projectinfo{
    @PrimaryGeneratedColumn()
    id:Number;

    @IsString()
    @IsNotEmpty()
    @Column()
    name:String;

    
    @Column({'default':0})
    status:number;
    
}