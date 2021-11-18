import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenBoxModalComponent } from './open-box-modal.component';

@NgModule({
  declarations: [
    OpenBoxModalComponent
  ],
  exports: [
    OpenBoxModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OpenBoxModalModule { }
