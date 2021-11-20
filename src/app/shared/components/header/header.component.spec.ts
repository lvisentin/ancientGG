import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { GET_USER } from '../../queries/user-queries';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../../models/user.models';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let controller: ApolloTestingController;

  const mockUser: User = {
    id: 'mockid',
    name: 'mockname',
    avatar: 'mockavatar',
    wallets: [
      {
        amount: 150,
        currency: 'TKN',
        id: 'mockwallet'
      }
    ],
  };

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

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

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    controller = TestBed.inject(ApolloTestingController);

    component.user = mockUser;

    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const op = controller.expectOne('currentUser');

    op.flush({
      data: {
        currentUser: {
          id: 'mockid',
          name: 'mockname',
          avatar: 'mockavatar',
          wallets: [
            {
              amount: 150,
              currency: 'TKN',
              id: 'mockwallet'
            }
          ],
        }
      }
    });

    controller.verify();
  });

  it('should redirectToLogin', () => {
    let spyOnLogin = spyOn(authService, 'login');
    component.redirectToLogin();

    const op = controller.expectOne('currentUser');

    op.flush({
      data: {
        currentUser: {
          id: 'mockid',
          name: 'mockname',
          avatar: 'mockavatar',
          wallets: [
            {
              amount: 150,
              currency: 'TKN',
              id: 'mockwallet'
            }
          ],
        }
      }
    });

    expect(spyOnLogin).toHaveBeenCalled();
  });

  it('should get user info', () => {
    component.getUserInfo();

    const op = controller.expectOne(GET_USER);

    op.flush({
      data: {
        currentUser: {
          id: 'mockid',
          name: 'mockname',
          avatar: 'mockavatar',
          wallets: [
            {
              amount: 150,
              currency: 'TKN',
              id: 'mockwallet'
            }
          ],
        }
      }
    });

    controller.verify();

    expect(component.user).toBeTruthy();
  });

  it('should get subscribe to wallet changes', () => {
    component.subscribeToWalletChanges();

    const op = controller.expectOne(GET_USER);

    op.flush({
      data: {
        currentUser: {
          id: 'mockid',
          name: 'mockname',
          avatar: 'mockavatar',
          wallets: [
            {
              amount: 150,
              currency: 'TKN',
              id: 'mockwallet'
            }
          ],
        }
      }
    });

    const walletOp = controller.expectOne('OnUpdateWallet');

    walletOp.flush({
      data: {
        updateWallet: {
          wallet: {
            id: 'mockid',
            amount: 150,
            name: 'mockname',
          }
        }
      }
    });

    controller.verify();
  });
});
