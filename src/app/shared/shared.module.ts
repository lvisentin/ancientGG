import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './components/item-card/item-card.component';



@NgModule({
  declarations: [
    ItemCardComponent,
  ],
  exports: [
    ItemCardComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
