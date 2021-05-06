import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService, PersonneService } from '../../../core/services';
import { Clan } from '../../../entity/Clan';
import { DureeDeVie } from '../../../entity/DureeDeVie';
import { Nom } from '../../../entity/Nom';
import { Personne } from '../../../entity/Personne';
import { Profession } from '../../../entity/Profession';
import { InputItem } from './input-list/input-list.component';

@Component({
  selector: 'app-personne-form',
  templateUrl: './personne-form.component.html',
  styleUrls: ['./personne-form.component.scss']
})
export class PersonneFormComponent {

  index: number;
  startIndex = 1;
  endIndex = 6;
  personne = new Personne();

  inputDataOne: InputItem[];
  inputDataTwo: InputItem[];
  inputDataThree: InputItem[];
  //inputDataFour: InputItem[];
  inputDataFive: InputItem[];
  inputDataSix: InputItem[];

  /*    { id: 4, title: "Enfants", valide: true },*/
  ETAPES = [
    { id: 1, title: "Clan", valide: false },
    { id: 2, title: "Identité", valide: false },
    { id: 3, title: "Partenaires", valide: true },
    { id: 4, title: "Professions", valide: true },
    { id: 5, title: "Information complémentaire", valide: true }
  ]

  constructor(private _personneService: PersonneService, private _route: ActivatedRoute, private _router: Router) {
    this.index = 1;
    this.inputDataOne = [];
    this.inputDataTwo = [];
    this.inputDataThree = [];
    //this.inputDataFour = [];
    this.inputDataFive = [];
    this.inputDataSix = [];

  }

  setInputData(item: Personne) {
    if (item) {
      this.personne = item;
      this.ETAPES[0].valide = true;
      if (item?.clan) {
        this.inputDataOne.push(new InputItem('clan', item?.clan));
      } else {
        this.ETAPES[0].valide = false;
      }

      this.inputDataOne.push(new InputItem('pere', item?.pere));
      this.inputDataOne.push(new InputItem('mere', item?.mere));

      this.inputDataTwo.push(new InputItem('nom', item?.nom?.text));
      this.inputDataTwo.push(new InputItem('sexe', item?.sexe));
      this.ETAPES[1].valide = true;

      this.inputDataThree.push(new InputItem('partenaire', item?.partenaires));

      // this.inputDataFour.push(new InputItem('enfant', item?.enfant));

      this.inputDataFive.push(new InputItem('profession', item?.profession));

      this.inputDataSix.push(new InputItem('dateNaissance', item?.dureeDeVie?.dateDeNaissance));
      this.inputDataSix.push(new InputItem('dateDeces', item?.dureeDeVie?.dateDeDeces));
      this.inputDataSix.push(new InputItem('status', item?.statutMarital));
      this.inputDataSix.push(new InputItem('comment', item?.Commentaire));
    }

  }

  ngOnInit(): void {
    this._route
    .data
    .subscribe(d => {
      this.setInputData(history.state.itemData);
    });
  }

  suivant() {
    if (this.index < this.endIndex)
      this.index++;
  }

  precedent() {
    if (this.index > this.startIndex)
      this.index--;
  }

  navigation(i) {
    this.index = i;
  }

  handleDataEvent($event, c) {
    switch (c) {
      case 'one':
        this.handlCache(this.inputDataOne, $event);
        /**Vérification que tous les champs du premier etape sont nom null */
        if (this.inputDataOne.length == 3) {
          this.ETAPES[0].valide = true;
          this.inputDataOne.forEach(element => {
            if (element.value == null) {
              this.ETAPES[0].valide = false;
            }
          });
        } else {
          this.ETAPES[0].valide = false;
        }
        break;
      case 'two':
        this.handlCache(this.inputDataTwo, $event);
        /**Vérification que tous les champs du premier etape sont nom null */
        if (this.inputDataTwo.find(d => d.id == 'nom')?.value &&
          this.inputDataTwo.find(d => d.id == 'sexe')?.value) {
          this.ETAPES[1].valide = true;
        } else {
          this.ETAPES[1].valide = false;
        }
        break;
      case 'three':
        this.handlCache(this.inputDataThree, $event);
        break;
      case 'four':
        /*this.handlCache(this.inputDataFour, $event);
        console.log(this.inputDataFour);*/
        break;
      case 'five':
        this.handlCache(this.inputDataFive, $event);
        break;
      case 'six':
        this.handlCache(this.inputDataSix, $event);
        break;
    }
  }

  handlCache(list: InputItem[], event) {
    if (list.find(d => d.id == event.type)) {
      list.map(d => {
        if (d.id == event.type) {
          d.value = event.data;
        }
      })
    } else {
      list.push(new InputItem(event.type, event.data))
    }
  }

  annuler() {
    console.log("Annuler");
    this._router.navigate(['accueil/pers']);
  }

  valide() {

    console.log('Création d\'une personne');
    this.personne.nom.prononciation = this.inputDataTwo.find(d => d.id == 'prononom')?.value;
    this.personne.nom.text = this.inputDataTwo.find(d => d.id == 'nom')?.value;
   
    if(this.inputDataTwo.find(d => d.id == 'photo')?.value){
      this.personne.photo = this.inputDataTwo.find(d => d.id == 'photo')?.value;
    }
    this.personne.prenoms = this.inputDataTwo.find(d => d.id == 'prenom')?.value;
    this.personne.age = this.inputDataTwo.find(d => d.id == 'age')?.value;
    this.personne.sexe = this.inputDataTwo.find(d => d.id == 'sexe')?.value;

    /**saisis du clan */
    this.personne.clan = this.inputDataOne.find(d => d.id == 'clan')?.value;

    /*Saisi des parents */
    this.personne.pere = this.inputDataOne.find(d => d.id == 'pere')?.value;
    this.personne.mere = this.inputDataOne.find(d => d.id == 'mere')?.value;
    if(this.personne.pere.id==0){
      this.personne.pere = null
    }
    if(this.personne.mere.id==0){
      this.personne.mere = null
    }

    /*Saisi des partenaires */
    this.personne.partenaires = [];
    this.personne.partenaires = this.inputDataThree.find(d => d.id == 'partenaire')?.value;

    /*Saisi des profession */
    this.personne.profession = [];
    this.personne.profession = this.inputDataFive.find(d => d.id == 'profession')?.value;

    /*Saisi de details complémentaire*/
    this.personne.dureeDeVie.dateDeNaissance = this.inputDataSix.find(d => d.id == 'dateNaissance')?.value;
    this.personne.dureeDeVie.dateDeDeces = this.inputDataSix.find(d => d.id == 'dateDeces')?.value;
    this.personne.statutMarital = this.inputDataSix.find(d => d.id == 'status')?.value;
    this.personne.Commentaire = this.inputDataSix.find(d => d.id == 'comment')?.value;

    this._personneService.addPersonne(this.personne).subscribe(data => {
      this._router.navigate(['accueil/pers']);
    })
  }

}
