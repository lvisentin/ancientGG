import { Apollo, QueryRef } from 'apollo-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GET_USER } from '../../queries/user-queries';
import { ON_UPDATE_WALLET } from '../../queries/wallet-queries';
import { Subject } from 'rxjs';
import { User } from '../../models/user.models';

@Component({
  selector: 'agg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  public walletQuery: QueryRef<any>
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly apollo: Apollo,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
    this.destroy$.next(false);
  }

  public redirectToLogin(): void {
    this.authService.login();
  }

  public subscribeToWalletChanges(): void {
    this.walletQuery = this.apollo.watchQuery({ query: GET_USER });

    this.walletQuery
      .subscribeToMore(
        {
          document: ON_UPDATE_WALLET,
          updateQuery: () => {
            this.getUserInfo();
          }
        }
      );
  }

  public getUserInfo(): void {
    this.authService
      .getCurrentUserInformation()
      .pipe(takeUntil(this.destroy$))
      .pipe(first())
      .subscribe(({ data }: any) => {
        this.user = data.currentUser;
        this.subscribeToWalletChanges();
      });
  }
}
