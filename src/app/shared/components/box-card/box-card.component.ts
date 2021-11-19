import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenBoxModalService } from 'src/app/services/open-box-modal/open-box-modal.service';
import { Box, BoxResponse } from '../../models/boxes.model';

@Component({
  selector: 'agg-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit {

  @Input() box: Box;
  @Output() customClick = new EventEmitter();
  public boxData: Box;

  constructor(
    private readonly openBoxModalService: OpenBoxModalService,
  ) { }

  ngOnInit(): void {
    this.boxData = this.box;
  }

  public handleOpenCaseClick() {
    if (this.customClick.observers.length > 0) {
      this.customClick.emit();
    } else {
      this.openModal();
    }
  }

  private openModal(): void {
    this.openBoxModalService.open({ data: { boxId: this.boxData?.id } });
  }

}
