import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxListComponent } from './box-list.component';
import { BoxCardModule } from '../box-card/box-card.module';

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
