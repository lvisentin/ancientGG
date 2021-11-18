import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../models/user.models';

@Component({
  selector: 'agg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User | null = null;

  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo(): void {
    this.user = this.authService.getCurrentUserInformation();
  }

  public redirectToLogin(): void {
    this.authService.login();
  }
}
