import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OutputData } from '../../../../model/output-data';
import { InputItem } from '../input-list/input-list.component';
import {Profession} from '../../../../entity/Profession';

@Component({
  selector: 'app-etape-five',
  templateUrl: './etape-five.component.html',
  styleUrls: ['./etape-five.component.css']
})
export class EtapeFiveComponent implements OnInit {


  title="Les professions";
  professions: Profession[];
  list: InputItem[] ;
  idList = [];
  inputControl="input";
  inputType="string";
  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData:InputItem[];

  constructor() {  
    this.list = [];
  }

  ngOnInit(): void {
      this.professions = [];
      this.idList = this.inputData.length? this.inputData.find(d=>d.id=='profession')?.value:[];
      this.list = this.inputData.length? this.professionToString(this.inputData.find(d=>d.id=='profession')?.value):[];
  }

  handleListEvent($event){
    $event = $event.map(element => {
      let newElement = new Profession;
      let notExite = true;

      this.idList.forEach(element2 => {
        if (element2.intitule == element.value) {
          newElement = element2;
          notExite = false;
        }
      });
      if (notExite) {
        newElement.intitule = element.value;
      }
      return newElement;
    })
    let outputData = new OutputData();
    outputData.data = $event;
    outputData.type = "profession";
    this.dataEvent.emit(outputData);
  }

  professionToString(listProfession: Profession[]) {
    let listPersonne = [];
    listProfession.forEach(element => {
      listPersonne.push(new InputItem(undefined,element.intitule) );
    });
    return listPersonne;
  }

}
