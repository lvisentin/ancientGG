import { BoxCardModule } from '../box-card/box-card.module';
import { CommonModule } from '@angular/common';
import { ItemCardModule } from '../item-card/item-card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { OpenBoxModalComponent } from './open-box-modal.component';

@NgModule({
  declarations: [
    OpenBoxModalComponent
  ],
  exports: [
    OpenBoxModalComponent,
  ],
  imports: [
    CommonModule,
    BoxCardModule,
    MatSnackBarModule,
    ItemCardModule,
    MatDialogModule,
  ]
})
export class OpenBoxModalModule { }
