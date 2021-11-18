import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { HeaderModule } from './components/header/header.module';
import { ItemCardModule } from './components/item-card/item-card.module';

@NgModule({
  exports: [
    HeaderModule,
    ItemCardModule
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ItemCardModule
  ]
})
export class SharedModule { }
