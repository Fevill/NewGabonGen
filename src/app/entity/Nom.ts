import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany} from "typeorm";
import { Personne } from "./Personne";

@Entity()
export class Nom 
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    text: string;

    @Column({nullable: true})
    prononciation: string;

    @OneToMany(() => Personne, personne => personne.nom)
    personnes: Personne[];

}