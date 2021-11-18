import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { ItemCardModule } from './components/item-card/item-card.module';
import { ItemListModule } from './components/item-list/item-list.module';

@NgModule({
  exports: [
    HeaderModule,
    ItemCardModule,
    ItemListModule,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ItemCardModule,
    ItemListModule,
  ]
})
export class SharedModule { }
