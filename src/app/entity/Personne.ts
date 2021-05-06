import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Nom } from "./Nom";

import { Clan } from './Clan';
import { DureeDeVie } from './DureeDeVie';
import { Profession } from './Profession';
import { observable } from 'rxjs';

@Entity()
export class Personne {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    prenoms: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    sexe: string;

    @OneToOne(() => DureeDeVie, { cascade: true })
    @JoinColumn()
    dureeDeVie: DureeDeVie;

    @Column({ nullable: true })
    statutMarital: string;

    @ManyToOne(() => Nom, nom => nom.personnes, { cascade: true })
    nom: Nom;

    /** Le clan */
    @ManyToOne(() => Clan, clan => clan.personnes, { cascade: true })
    clan: Clan;

    /** Parents et enfants */
    @ManyToOne(() => Personne, clan => clan.enfants, { cascade: true })
    pere: Personne;

    @ManyToOne(() => Personne, clan => clan.enfants, { cascade: true })
    mere: Personne;

    @OneToMany(() => Personne, personne => personne.pere)
    enfants: Personne[];

    /** Partenaires */
    @ManyToOne(() => Personne, personne => personne.partenaires, { cascade: true })
    partenaire: Personne;

    @OneToMany(() => Personne, personne => personne.partenaire)
    partenaires: Personne[];

    /** Profession de la personne */
    @ManyToMany(() => Profession, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable()
    profession: Profession[];

    /** Autre informations */
    @Column("text", { nullable: true })
    Commentaire: string;

    @Column("blob", { nullable: true })
    photo: Buffer;

    constructor() {

        this.nom = new Nom;
        this.dureeDeVie = new DureeDeVie;
        this.clan = new Clan;

        this.getBase64ImageFromUrl('assets/icons/user.png')
            .then((result:Buffer) => {this.photo = result})
            .catch(err => console.error(err));
    }

    async getBase64ImageFromUrl(imageUrl) {
        var res = await fetch(imageUrl);
        var file = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });
    }
}