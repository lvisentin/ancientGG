import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GET_USER } from './shared/queries/user-queries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ancientGG';

  constructor(
    private readonly apollo: Apollo,
  ) { }


  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.apollo.watchQuery({ query: GET_USER })
      .valueChanges
      .subscribe((currentUserResponse: any) => {
        if (currentUserResponse.data) {
          localStorage.setItem('user', JSON.stringify(currentUserResponse.data));
        }
      })
  }
}
