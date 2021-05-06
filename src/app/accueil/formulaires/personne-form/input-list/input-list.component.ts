import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonneService } from '../../../../core/services';
import { Nom } from '../../../../entity/Nom';
import { Personne } from '../../../../entity/Personne';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent implements OnInit {

  @Input()
  title;
  @Input()
  outList: InputItem[];
  @Input()
  inputType: String;
  @Input()
  inputControl: String;
  personnes: Personne[] = [];

  @Output() 
  listEvent = new EventEmitter<InputItem[]>();

  value:string ='';

  constructor(private _personneService: PersonneService) { }

  ngOnInit(): void {
    this._personneService.getPersonnes().subscribe(data => { this.personnes = data; })
  }

  ajouter(){
    this.outList.push(new InputItem(undefined,this.value));
    this.listEvent.emit(this.outList);
    this.value = "";
  }

  supprimer(value){
    this.outList = this.outList.filter(item => item!=value);
    this.listEvent.emit(this.outList);
  }

}

export class InputItem {
      id:string;
      value:any;

      constructor(id?,value?){
        this.id =id
        this.value=value;
      }
}
