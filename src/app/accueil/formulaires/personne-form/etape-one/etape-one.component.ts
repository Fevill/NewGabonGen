import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClanService, PersonneService } from '../../../../core/services';
import { Clan } from '../../../../entity/Clan';
import { Nom } from '../../../../entity/Nom';
import { Personne } from '../../../../entity/Personne';
import { OutputData } from '../../../../model/output-data';
import { InputItem } from '../input-list/input-list.component';


@Component({
  selector: 'app-etape-one',
  templateUrl: './etape-one.component.html',
  styleUrls: ['./etape-one.component.css']
})
export class EtapeOneComponent implements OnInit {

  oneForm: FormGroup;
  clans: Clan[] = [];
  parents: Personne[] = [];

  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData:InputItem[];

  cl = new Clan;
  constructor(private _fb: FormBuilder,private _clanService: ClanService,private _personneService: PersonneService) {
  
  }

  createForm() {
    this.oneForm = this._fb.group({
      pere: [this.selectPersonneValue(this.parents,'pere','personne')],
      mere: [this.selectPersonneValue(this.parents,'mere','personne')],
      clan: [this.selectValue(this.clans,'clan','id'), Validators.required],
    });

  }

  ngOnInit(): void {
    this.getClans();
    this.getPersonne();
    this.createForm();

    this.oneForm.get("clan").valueChanges.subscribe(data => {
      this.handleDataEvent("clan", data)
    }),
      this.oneForm.get("pere").valueChanges.subscribe(data => {
        let p:Personne;
        p = data;
        this.handleDataEvent("pere",p)
      })
    this.oneForm.get("mere").valueChanges.subscribe(data => {
      let  p:Personne;
        p = data;
      this.handleDataEvent("mere", p)
    })
  }

  handleDataEvent(type, data) {
    let outputData = new OutputData();
    outputData.data = data;
    outputData.type = type;
    this.dataEvent.emit(outputData);
  }

  getClans() {
    console.log("Récuperer la liste des clans")
    this._clanService.getClans().subscribe(data => { this.clans = data;});
  }

  getPersonne() {
    console.log("Récuperer la liste des personnes")
    this._personneService.getPersonnes().subscribe(data => { this.parents = data;});    
  }

  /**
   * 
   * @param list la liste dans le quell il faut choisir
   * @param index l'option (pere, mere ou clan)
   * @param id l'identifiant de comparaison (idparent ou idClan par exemple)
   */
  selectValue(list:any[],index:string,id:any){
    return list.find(i=>i[id]==this.inputData.find(d=>d.id==index)?.value[id])
  }

  selectPersonneValue(list:any[],index:string,id:any){
    let res = list.find(i=>i.id==this.inputData.find(d=>d.id==index)?.value.id);
    return res;
  }

  sexefilter(personnes:Personne[],sexes:String[]){
    let ps = personnes.filter(p=>p.sexe==sexes[0] || p.sexe==sexes[1]);
    return ps;
  }
  
}