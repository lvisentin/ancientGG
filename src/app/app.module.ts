import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './shared/components/header/header.module';
import { OpenBoxModalModule } from './shared/components/open-box-modal/open-box-modal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    GraphQLModule,
    HttpClientModule,
    HeaderModule,
    OpenBoxModalModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
