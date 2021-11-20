import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphQLModule } from 'src/app/graphql.module';

import { OpenBoxModalComponent } from './open-box-modal.component';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { GET_BOX_BY_ID, OPEN_BOX_MUTATION } from '../../queries/boxes-queries';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OpenBoxModalService } from 'src/app/services/open-box-modal/open-box-modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

fdescribe('OpenBoxModalComponent', () => {
  let component: OpenBoxModalComponent;
  let fixture: ComponentFixture<OpenBoxModalComponent>;
  let controller: ApolloTestingController;
  let openBoxModalService: OpenBoxModalService;
  let authService: AuthService;

  const mockModalData = {
    isOpened: true,
    data: { boxId: '0' }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenBoxModalComponent],
      imports: [ApolloTestingModule, HttpClientTestingModule],
      providers: [OpenBoxModalService, AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBoxModalComponent);

    component = fixture.componentInstance;
    component.dialogData = { boxId: 'test' };
    component.isOpened = true;

    openBoxModalService = TestBed.inject(OpenBoxModalService);
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

  it('should get box info', () => {
    openBoxModalService.modalData.subscribe((res) => expect(res).toEqual(mockModalData));

    component.getBoxData();
    expect(component.isLoading).toBeTrue();

    const op = controller.expectOne(GET_BOX_BY_ID);

    op.flush({
      data: {
        box: {
          cost: 150,
          iconUrl: 'mockUrl',
          id: 'mockId',
          name: 'mockbox',
          slug: 'mockSlug',
          marketId: 'mockmarketId',
        }
      }
    })

    controller.verify();
  });

  it('should open the case', () => {
    component.openCase({ quantity: 1 });

    expect(component.isLoading).toBeTruthy();

    const op = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(OPEN_BOX_MUTATION.definitions);
      return true;
    });

    op.flush({
      data: {
        openBox: {
          boxOpenings: [
            {
              id: 'mockId',
              itemVariant: {
                __typename: 'mockItemVariant',
                id: 'mockId',
                name: 'mockName',
                value: 99,
                iconUrl: 'mockIconUrl',
              }
            }
          ]
        }
      }
    })

    controller.verify();
  });


  it('should close the modal', () => {
    component.close();

    expect(component.boxData).toBeNull();
    expect(component.boxOpenings.length).toEqual(0);
  });

  it('should try again', () => {
    component.tryAgain();

    expect(component.boxOpenings.length).toEqual(0);
  });
});
