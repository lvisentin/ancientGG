import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxCardComponent } from './box-card.component';



@NgModule({
  declarations: [BoxCardComponent],
  exports: [BoxCardComponent],
  imports: [
    CommonModule
  ]
})
export class BoxCardModule { }
