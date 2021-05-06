import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Profession
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    intitule: string;

    @Column({nullable: true})
    desc: string;
}