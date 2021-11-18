import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  private GET_USER = gql`
    query currentUser {
      currentUser {
      id
      name
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
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.apollo.watchQuery({ query: this.GET_USER })
    .valueChanges
    .subscribe((currentUserResponse: any) => {
      console.log(currentUserResponse)
    })
  }
}
