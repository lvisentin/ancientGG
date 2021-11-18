import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { HeaderModule } from './components/header/header.module';



@NgModule({
  declarations: [
    ItemCardComponent,
  ],
  exports: [
    ItemCardComponent,
    HeaderModule
  ],
  imports: [
    CommonModule,
    HeaderModule,
  ]
})
export class SharedModule { }
