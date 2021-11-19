import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user.models';
import { GET_USER } from '../../queries/user-queries';
import { ON_UPDATE_WALLET } from '../../queries/wallet-queries';

@Component({
  selector: 'agg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private walletQuery: QueryRef<any>
  public user: User;

  constructor(
    private readonly apollo: Apollo,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.walletQuery = this.apollo.watchQuery({ query: GET_USER });
    this.getUserInfo();
    this.subscribeToWalletChanges();
  }

  public redirectToLogin(): void {
    this.authService.login();
  }

  private getUserInfo(): void {
    this.authService
      .getCurrentUserInformation()
      .subscribe(({ data }: any) => this.user = data.currentUser);
  }

  private subscribeToWalletChanges(): void {
    this.walletQuery.subscribeToMore(
      {
        document: ON_UPDATE_WALLET,
        updateQuery: () => {
          this.getUserInfo();
        }
      }
    )
  }
}
