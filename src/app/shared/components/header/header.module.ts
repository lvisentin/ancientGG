import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { WalletBalanceModule } from '../wallet-balance/wallet-balance.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    WalletBalanceModule,
  ]
})
export class HeaderModule { }
