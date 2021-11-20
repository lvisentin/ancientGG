import { Component, Input, OnInit } from '@angular/core';
import { ItemVariant } from '../../models/boxes.model';

@Component({
  selector: 'agg-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() itemVariant: ItemVariant;
}
