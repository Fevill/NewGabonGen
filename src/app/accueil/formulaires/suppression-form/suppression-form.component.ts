import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService, PersonneService } from '../../../core/services';

@Component({
  selector: 'app-suppression-form',
  templateUrl: './suppression-form.component.html',
  styleUrls: ['./suppression-form.component.scss']
})
export class SuppressionFormComponent implements OnInit {

  path;
  item;
  items;
  errors


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _clanService: ClanService,
    private _personneService: PersonneService) { }

  ngOnInit(): void {
    this._route
    .data
    .subscribe(d => {
      this.path = history.state.path; 
      this.item = history.state.itemData;
    });
  }

  supprimer(){
    switch (this.path) {
      case 'clan':
        this._clanService.deleteClan(this.item).subscribe(
          result => {
            this.items = result;
          },
          error => {
            this.errors = error;
          },
          () => {
            this._router.navigate(['accueil/' + this.path ]);
          }
        );
        break;
      case 'pers':
        this._personneService.deletePersonne(this.item).subscribe(        
          result => {
            this.items = result;
          },
          error => {
            this.errors = error;
          },
          () => {
            this._router.navigate(['accueil/' + this.path ]);
          }
        );
        break;
      default:
    }

  }
 
  annuler(){
    this._router.navigate(['accueil/' + this.path ]);
  }

}
