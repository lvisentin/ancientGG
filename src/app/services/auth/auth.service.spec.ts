import { ApolloTestingModule } from 'apollo-angular/testing';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    spyOn(service, 'login').and.callThrough();
    service.login();
    expect(service.login).toHaveBeenCalled();
  });
});
