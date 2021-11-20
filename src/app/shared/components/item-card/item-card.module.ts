import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ItemCardComponent,
  ],
  exports: [
    ItemCardComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ItemCardModule { }
