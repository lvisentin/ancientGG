import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { BoxCardModule } from './components/box-card/box-card.module';
import { BoxListModule } from './components/box-list/box-list.module';
import { WalletBalanceModule } from './components/wallet-balance/wallet-balance.module';

@NgModule({
  exports: [
    HeaderModule,
    BoxCardModule,
    BoxListModule,
    WalletBalanceModule,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    BoxCardModule,
    BoxListModule,
    WalletBalanceModule,
  ],
})
export class SharedModule { }
