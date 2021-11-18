import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agg-open-box-modal',
  templateUrl: './open-box-modal.component.html',
  styleUrls: ['./open-box-modal.component.scss']
})
export class OpenBoxModalComponent implements OnInit {

  public isOpened: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
