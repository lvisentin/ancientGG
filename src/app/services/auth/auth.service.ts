import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Subject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.models';
import { GET_USER } from 'src/app/shared/queries/user-queries';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly apollo: Apollo) { }

  public login(): void {
    window.location.href = "https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200";
  }

  public getCurrentUserInformation(): Observable<any> {
    const getCurrenUserObservable = this.apollo.watchQuery<User>({ query: GET_USER })
      .valueChanges;

    return getCurrenUserObservable;
  }

  public refreshCurrentUserInformation(): void {
    this.apollo.watchQuery({ query: GET_USER })
      .valueChanges
      .subscribe((currentUserResponse) => {
        if (currentUserResponse.data) {
          localStorage.setItem('user', JSON.stringify(currentUserResponse.data));
        }
      })
  }
}
