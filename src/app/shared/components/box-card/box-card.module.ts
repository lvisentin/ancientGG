import { BoxCardComponent } from './box-card.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [BoxCardComponent],
  exports: [BoxCardComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class BoxCardModule { }
