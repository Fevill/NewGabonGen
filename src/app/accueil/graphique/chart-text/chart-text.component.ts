import { SimpleChanges } from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NodeChart } from '../../../model/node-chart';

@Component({
  selector: 'app-chart-text',
  templateUrl: './chart-text.component.html',
  styleUrls: ['./chart-text.component.scss']
})
export class ChartTextComponent implements OnInit, OnChanges {

  @Input() nodeChart: NodeChart;
  @Input() initial: Boolean;

  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
  }
  
  collapse(id){
    return 'collapse'+id;
  }

  getCollapse(id){
    return '#collapse'+id;
  }

}
