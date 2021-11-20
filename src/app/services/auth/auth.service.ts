import { Apollo } from 'apollo-angular';
import { GET_USER } from 'src/app/shared/queries/user-queries';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly apollo: Apollo) { }

  public login(): void {
    window.location.href = environment.login_url;
  }

  public getCurrentUserInformation(): Observable<any> {
    const getCurrenUserObservable = this.apollo.watchQuery<User>({ query: GET_USER })
      .valueChanges;

    return getCurrenUserObservable;
  }
}
