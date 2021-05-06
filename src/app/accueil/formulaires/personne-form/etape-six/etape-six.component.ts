import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutputData } from '../../../../model/output-data';
import { InputItem } from '../input-list/input-list.component';

@Component({
  selector: 'app-etape-six',
  templateUrl: './etape-six.component.html',
  styleUrls: ['./etape-six.component.css']
})
export class EtapeSixComponent implements OnInit {

  sixForm: FormGroup;
  STATUS_MARITAL = [
    "Célibataire",
    "Concubin",
    "Divorcé",
    "Veuf",
    "Marié",
    "Autres"
  ];

  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData: InputItem[];

  dateMin: any;
  dateMax: any;

  constructor(private _fb: FormBuilder) {

  }

  createForm() {
    /*this.sixForm = this._fb.group({
      status: [''],//Etat civil this.inputData.find(d=>d.id=='status')?.value
      comment: [this.inputData.find(d=>d.id=='comment')?.value,],
      dateNaissance: [this.inputData.find(d=>d.id=='dateNaissance')?.value],
      dateDeces: [this.inputData.find(d=>d.id=='dateDeces')?.value]
    });**/
    this.sixForm = this._fb.group({
      status: [this.inputData.find(d => d.id == 'status')?.value],//Etat civil 
      comment: [this.inputData.find(d => d.id == 'comment')?.value],
      dateNaissance: [this.inputData.find(d => d.id == 'dateNaissance')?.value],
      dateDeces: [this.inputData.find(d => d.id == 'dateDeces')?.value]
    });

  }

  ngOnInit(): void {
    this.dateMin = new Date;
    this.dateMax = new Date;

    this.createForm();

    this.sixForm.get("status").valueChanges.subscribe(data => {
      this.handleDataEvent("status", data)
    });
    this.sixForm.get("comment").valueChanges.subscribe(data => {
      this.handleDataEvent("comment", data)
    });
    this.sixForm.get("dateNaissance").valueChanges.subscribe(data => {
      this.dateMin = data;
      this.handleDataEvent("dateNaissance", data)
    });
    this.sixForm.get("dateDeces").valueChanges.subscribe(data => {
      this.dateMax = data;
      this.handleDataEvent("dateDeces", data)
    });
  }

  handleDataEvent(type, data) {
    let outputData = new OutputData();
    outputData.data = data;
    outputData.type = type;
    this.dataEvent.emit(outputData);
  }

}
