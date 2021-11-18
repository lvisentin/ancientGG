import { Component, Input, OnInit } from '@angular/core';
import { Box, BoxResponse } from '../../models/boxes.model';

@Component({
  selector: 'agg-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit {

  @Input() box: BoxResponse | undefined;
  public boxData: Box | undefined;

  constructor() { }

  ngOnInit(): void {
    this.boxData = this.box?.node;
    console.log(this.boxData)
  }

}
