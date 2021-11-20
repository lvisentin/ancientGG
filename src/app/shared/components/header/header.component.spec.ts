import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
    controller.verify();
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
