import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenBoxModalComponent } from './open-box-modal.component';
import { BoxCardModule } from '../box-card/box-card.module';
import { ItemCardModule } from '../item-card/item-card.module';

@NgModule({
  declarations: [
    OpenBoxModalComponent
  ],
  exports: [
    OpenBoxModalComponent
  ],
  imports: [
    CommonModule,
    BoxCardModule,
    ItemCardModule,
  ]
})
export class OpenBoxModalModule { }
