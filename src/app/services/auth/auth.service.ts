import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public login(): void {
    window.location.href = "https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200";
  }

  public getCurrentUserInformation(): User | null {
    const user = JSON.parse(localStorage.getItem('user') || '');

    if (!user) {
      return null;
    }

    return user.currentUser;
  }
}
