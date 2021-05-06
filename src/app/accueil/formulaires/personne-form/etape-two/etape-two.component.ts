import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutputData } from '../../../../model/output-data';
import { InputItem } from '../input-list/input-list.component';

@Component({
  selector: 'app-etape-two',
  templateUrl: './etape-two.component.html',
  styleUrls: ['./etape-two.component.css']
})
export class EtapeTwoComponent implements OnInit {

  twoForm: FormGroup;

  @Output()
  dataEvent = new EventEmitter<OutputData>();

  @Input()
  inputData: InputItem[];

  constructor(private _fb: FormBuilder) {
  }

  createForm() {
    this.twoForm = this._fb.group({
      nom: [this.inputData.find(d => d.id == 'nom')?.value, Validators.required],
      sexe: [this.inputData.find(d => d.id == 'sexe')?.value, Validators.required],
      prononom: [this.inputData.find(d => d.id == 'prononom')?.value],
      prenom: [this.inputData.find(d => d.id == 'prenom')?.value],
      age: [this.inputData.find(d => d.id == 'age')?.value],
    });

  }

  ngOnInit(): void {
    this.createForm();
    this.twoForm.get("nom").valueChanges.subscribe(data => {
      this.handleDataEvent("nom", data)
    });
    this.twoForm.get("prononom").valueChanges.subscribe(data => {
      this.handleDataEvent("prononom", data)

    }); this.twoForm.get("prenom").valueChanges.subscribe(data => {
      this.handleDataEvent("prenom", data)
    });
    this.twoForm.get("sexe").valueChanges.subscribe(data => {
      this.handleDataEvent("sexe", data)
    });
    this.twoForm.get("age").valueChanges.subscribe(data => {
      this.handleDataEvent("age", data)
    })
  }

  handleDataEvent(type, data) {
    let outputData = new OutputData();
    outputData.data = data;
    outputData.type = type;
    this.dataEvent.emit(outputData);
  }

  handleFileInput(files) {
    let file = files.item(0)
    this.toBase64(file).then(e=>{
      this.handleDataEvent("photo", e);
    })
   
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  

}
