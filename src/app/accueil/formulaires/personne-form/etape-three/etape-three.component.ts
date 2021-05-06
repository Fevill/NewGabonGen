import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputItem } from '../input-list/input-list.component';
import { OutputData } from '../../../../model/output-data';
import { Personne } from '../../../../entity/Personne';

@Component({
  selector: 'app-etape-three',
  templateUrl: './etape-three.component.html',
  styleUrls: ['./etape-three.component.css']
})
export class EtapeThreeComponent implements OnInit {

  title = "Les partenaires";
  partenaires: Personne[];
  list: InputItem[];
  inputControl: string;
  inputType: string;
  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData: InputItem[];

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.partenaires = [];
    this.list = this.inputData.length ? this.partenaireToPersonne(this.inputData.find(d => d.id == 'partenaire')?.value) : [];
    this.inputControl = "select";
    this.inputType = "partenaire";
    
  }

  handleListEvent($event) {
    let outputData = new OutputData();
    let newEvent:Personne[]=[];
    $event.forEach(element => {
      let e= new Personne;
      e = element.value;
      newEvent.push(e);
    });
    outputData.data = newEvent;
    outputData.type = "partenaire";
    this.dataEvent.emit(outputData);
  }

  partenaireToPersonne(listPartenaire: Personne[]) {
    let listPersonne = [];
    listPartenaire.forEach(element => {
      listPersonne.push(new InputItem(undefined,element) );
    });
    return listPersonne;
  }

}
