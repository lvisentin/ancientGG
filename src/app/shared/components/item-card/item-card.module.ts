import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './item-card.component';



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
