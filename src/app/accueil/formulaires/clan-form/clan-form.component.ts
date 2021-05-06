import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClanService } from '../../../core/services';
import { Clan } from '../../../entity/Clan';

@Component({
  selector: 'app-clan-form',
  templateUrl: './clan-form.component.html',
  styleUrls: ['./clan-form.component.scss']
})
export class ClanFormComponent implements OnInit {

  clanForm: FormGroup;
  id;

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _clanService: ClanService) {
  
    this._route
      .data
      .subscribe(d => {
        let item= new Clan()
        //item.setValue(history.state.itemData);
        this.createForm(history.state.itemData);
      });
  }

  ngOnInit(): void {
  }

  createForm(item: Clan) {
    if(item){
    this.id = item.id;
    }
    this.clanForm = this._fb.group({
      nomClan: ['', Validators.required],
      descriptionClan: ['']
    });
    if(item){
    this.clanForm.setValue({
      nomClan: item.nom, 
      descriptionClan: item.description,
    });
  }
  }

  annuler() {
    console.log("Annuler");
    this._router.navigate(['accueil/clan']);
  }


  valider() {
    console.log("Valider");
    let clan: Clan = new Clan();
    clan.id = this.id;
    clan.nom = this.clanForm.value.nomClan;
    clan.description = this.clanForm.value.descriptionClan;

 
    if(this.id){
      console.log("Update");
      this._clanService.updateClan(clan).subscribe(data => {
        this._router.navigate(['accueil/clan']);
      })
    }else{
      console.log("Create");
      this._clanService.addClan(clan).subscribe(data => {
        this._router.navigate(['accueil/clan']);
      })
    }
  }

}
