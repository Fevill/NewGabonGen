import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Personne } from "./Personne";

@Entity()
export class Enfant
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    typeEnfant: string;

    @OneToOne(() => Personne, { cascade: true, onDelete:'CASCADE'})
    @JoinColumn()
    personne: Personne;
}