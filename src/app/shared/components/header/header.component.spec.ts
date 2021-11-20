import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { Observable, of } from 'rxjs';
import { GraphQLModule } from 'src/app/graphql.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ON_UPDATE_WALLET } from '../../queries/wallet-queries';
import { HeaderComponent } from './header.component';
import { ApolloQueryResult } from '@apollo/client/core';
import { User } from '../../models/user.models';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let controller: ApolloTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        ApolloTestingModule,
      ],
      providers: [AuthService]
    })
      .compileComponents();
  });

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    controller = TestBed.inject(ApolloTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirectToLogin', () => {
    let spyOnLogin = spyOn(authService, 'login');
    component.redirectToLogin();
    expect(spyOnLogin).toHaveBeenCalled();
  });

  it('should get user info', () => {
    spyOn(authService, 'getCurrentUserInformation').and.callThrough();
    component.getUserInfo();
    expect(authService.getCurrentUserInformation).toHaveBeenCalledWith();
  });
});
