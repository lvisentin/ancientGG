import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { BoxCardModule } from './components/box-card/box-card.module';
import { BoxListModule } from './components/box-list/box-list.module';
import { CallbackComponent } from './components/callback/callback.component';

@NgModule({
  exports: [
    HeaderModule,
    BoxCardModule,
    BoxListModule,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    BoxCardModule,
    BoxListModule,
  ],
  declarations: [
    CallbackComponent
  ]
})
export class SharedModule { }
