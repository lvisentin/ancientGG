import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { ON_UPDATE_WALLET } from '../../queries/wallet-queries';

@Component({
  selector: 'agg-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.scss']
})
export class WalletBalanceComponent implements OnInit {

  private walletQuery: QueryRef<any> | null = null;

  constructor(
  ) { }

  ngOnInit(): void {
    this.watchWalletUpdates();
  }

  private watchWalletUpdates(): void {
    this.walletQuery?.subscribeToMore(
      {
        document: ON_UPDATE_WALLET,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newBalance = subscriptionData.data;
          console.log(newBalance)
          // console.log(prev, subscriptionData)
        }
      }
    )
    //   .watchQuery({ query: this.ON_UPDATE_WALLET })
    //   .valueChanges
    //   .subscribe((response) => console.log(response));
  }
}
