import { Component, Input, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_USER } from '../../queries/user-queries';
import { ON_UPDATE_WALLET } from '../../queries/wallet-queries';

@Component({
  selector: 'agg-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.scss']
})
export class WalletBalanceComponent implements OnInit {

  @Input() balance: number;
  private walletQuery: QueryRef<any>;

  constructor(
    private readonly apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.walletQuery = this.apollo.watchQuery({ query: GET_USER })
    this.watchWalletUpdates();
  }

  private refreshUserWallet() {

  }

  private watchWalletUpdates(): void {
    console.log('wallet balance watch updates')
    this.walletQuery?.subscribeToMore(
      {
        document: ON_UPDATE_WALLET,
        updateQuery: (prev, { subscriptionData }) => {
          const walletChange = subscriptionData.data;
          if (!subscriptionData.data) {
            return prev;
          }

          this.refreshUserWallet();
        }
      }
    )
  }
}
