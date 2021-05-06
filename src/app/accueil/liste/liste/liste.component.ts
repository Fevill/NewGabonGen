import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService, PersonneService } from '../../../core/services';
import { Clan } from '../../../entity/Clan';
import { Personne } from '../../../entity/Personne';
declare var $;

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

  _path: string;
  columnHeader: string[];
  items: Clan[] | Personne[];
  itemsDb: Clan[] | Personne[];
  selectedItem: any;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _clanService: ClanService,
    private _personneService: PersonneService,) {
  }
  ngOnInit(): void {
    this._route
      .data
      .subscribe(d => {
        this._path = d.path;
        this.columnHeader = d.header
        this.getItems();
      });
  }

  addItem() {
    console.log("Ajouter  un item")
    this._router.navigate(['accueil/' + this._path + '-form']);
  }

  updateItem(item) {
    console.log("Modifier un item")
    this._router.navigate(['accueil/' + this._path + '-form'], { state: { itemData: item } });
  }

  deleteItem(item) {
    console.log("Supprimer  un item")
    this._router.navigate(['accueil/del-form'], { state: { itemData: item, path: this._path} });
  }

  selectItem(item) {
    this.selectedItem = item;
  }

  getItems() {
    console.log("Récuperer la liste des items")
    switch (this._path) {
      case 'clan':
        this._clanService.getClans().subscribe(data => { this.items = data; });
         break;
      case 'pers':
        this._personneService.getPersonnes().subscribe(data => { this.items = data;});
        break;
      default:
    }
  }
  detailItem(item){
    this._personneService.getPersonneDetail().subscribe(data => {});
  }

}
