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
  @Input() variant: 'view' | 'open' = 'view';
  @Output() customClick = new EventEmitter();
  public hasCustomClick: boolean;
  public openingQt = [1, 2, 3, 4, 5];
  public selectedQt = 1;
  public boxData: Box;

  constructor(
    private readonly openBoxModalService: OpenBoxModalService,
  ) { }

  ngOnInit(): void {
    this.boxData = this.box;
    this.hasCustomClick = this.customClick.observers.length > 0;
  }

  public selectQt(qt: number) {
    this.selectedQt = qt;
  }

  public handleOpenCaseClick() {
    if (this.hasCustomClick) {
      this.customClick.emit({ quantity: this.selectedQt });
    } else {
      this.openModal();
    }
  }

  public openModal(): void {
    this.openBoxModalService.open({ data: { boxId: this.boxData?.id } });
  }

}
