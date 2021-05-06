import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DureeDeVie
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    dateDeNaissance: string;

    @Column({nullable: true})
    dateDeDeces: string;
}