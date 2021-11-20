import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BoxListModule } from 'src/app/shared/components/box-list/box-list.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { OpenBoxModalModule } from 'src/app/shared/components/open-box-modal/open-box-modal.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BoxListModule,
    HeaderModule,
    OpenBoxModalModule,
  ]
})
export class HomeModule { }
