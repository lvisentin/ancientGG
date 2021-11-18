import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ancientGG';

  private GET_USER = gql`
    query currentUser {
      currentUser {
      id
      name
      avatar
        wallets {
          id
          amount
          currency
        }
      }
    }
  `;

  constructor(
    private readonly apollo: Apollo,
  ) { }


  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.apollo.watchQuery({ query: this.GET_USER })
      .valueChanges
      .subscribe((currentUserResponse: any) => {
        if (currentUserResponse.data) {
          localStorage.setItem('user', JSON.stringify(currentUserResponse.data));
        }
      })
  }
}
