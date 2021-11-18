import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletBalanceComponent } from './wallet-balance.component';

@NgModule({
  declarations: [
    WalletBalanceComponent
  ],
  exports: [
    WalletBalanceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WalletBalanceModule { }
