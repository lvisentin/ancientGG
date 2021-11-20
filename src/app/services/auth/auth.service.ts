import { Apollo } from 'apollo-angular';
import { GET_USER } from 'src/app/shared/queries/user-queries';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.models';

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
