import { BoxCardModule } from '../box-card/box-card.module';
import { BoxListComponent } from './box-list.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    BoxListComponent
  ],
  exports: [
    BoxListComponent
  ],
  imports: [
    CommonModule,
    BoxCardModule,
  ]
})
export class BoxListModule { }
