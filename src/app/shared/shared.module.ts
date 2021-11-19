import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { BoxCardModule } from './components/box-card/box-card.module';
import { BoxListModule } from './components/box-list/box-list.module';
import { WalletBalanceModule } from './components/wallet-balance/wallet-balance.module';
import { OpenBoxModalComponent } from './components/open-box-modal/open-box-modal.component';
import { OpenBoxModalModule } from './components/open-box-modal/open-box-modal.module';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardModule } from './components/item-card/item-card.module';

@NgModule({
  exports: [
    HeaderModule,
    BoxCardModule,
    BoxListModule,
    WalletBalanceModule,
    OpenBoxModalModule,
    ItemCardModule,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    BoxCardModule,
    BoxListModule,
    WalletBalanceModule,
    OpenBoxModalModule,
    ItemCardModule,
  ],
})
export class SharedModule { }
