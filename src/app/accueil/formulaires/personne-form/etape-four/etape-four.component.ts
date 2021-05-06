import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputItem } from '../input-list/input-list.component';
import { OutputData } from '../../../../model/output-data';
import { Personne } from '../../../../entity/Personne';

@Component({
  selector: 'app-etape-four',
  templateUrl: './etape-four.component.html',
  styleUrls: ['./etape-four.component.css']
})
export class EtapeFourComponent implements OnInit {

  title = "Les enfants";
  //enfants: Enfant[];
  list: InputItem[];
  idList = [];
  inputControl = "input";
  inputType = "enfant";
  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData: InputItem[];

  constructor() {
    this.list = [];
  }

  ngOnInit(): void {
    //this.enfants = [];
    this.idList = this.inputData.length ? this.inputData.find(d => d.id == 'enfant')?.value : [];
    //this.list = this.inputData.length ? this.enfantToPersonne(this.inputData.find(d => d.id == 'enfant')?.value) : [];
  }

  handleListEvent($event) {
    $event = $event.map(element => {
      //let newElement = new Enfant;
      let personne = new Personne;
      let notExite = true;
      personne.prenoms = element.value;
      this.idList.forEach(element2 => {
        if (element2.personne.prenoms == element.value) {
         // newElement = element2;
          notExite = false;
        }
      });
      if (notExite) {
        //newElement.personne = personne;
      }
      //return newElement;
    })

    let outputData = new OutputData();
    outputData.data = $event;
    outputData.type = "enfant";
    this.dataEvent.emit(outputData);
  }

  enfantToPersonne(listEnfant) {
    let listPersonne = [];
    listEnfant.forEach(element => {
      listPersonne.push(new InputItem(undefined, element.personne.prenoms));
    });
    return listPersonne;
  }

}
