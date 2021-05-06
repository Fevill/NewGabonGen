import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Personne } from "./Personne";

@Entity()
export class Clan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    nom: string;

    @Column("text",{nullable: true})
    description: string;

    @OneToMany(() => Personne, personne => personne.clan)
    personnes: Personne[];

}