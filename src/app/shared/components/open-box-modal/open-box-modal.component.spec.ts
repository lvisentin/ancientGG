import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OPEN_BOX_MUTATION } from '../../queries/boxes-queries';
import { OpenBoxModalComponent } from './open-box-modal.component';

describe('OpenBoxModalComponent', () => {
  let component: OpenBoxModalComponent;
  let fixture: ComponentFixture<OpenBoxModalComponent>;
  let controller: ApolloTestingController;

  const mockModalData = {
    boxId: 'mockId'
  }

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenBoxModalComponent],
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [AuthService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: dialogMock
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBoxModalComponent);

    component = fixture.componentInstance;
    component.isOpened = true;

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
    component.dialogData = mockModalData;
    component.getBoxData();
    expect(component.isLoading).toBeTrue();

    const op = controller.expectOne('getBoxById');

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
    });

    controller.verify();
  });

  it('should open the case', () => {
    component.openCase({ quantity: 5 });

    expect(component.isLoading).toBeTrue();

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
    });

    controller.verify();
  });

  it('should open the case with error', () => {
    component.openCase({ quantity: 1 });

    expect(component.isLoading).toBeTruthy();

    const op = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(OPEN_BOX_MUTATION.definitions);
      return true;
    });

    op.graphqlErrors(
      [{
        message: "Error!",
        locations: undefined,
        path: undefined,
        nodes: undefined,
        source: undefined,
        positions: undefined,
        originalError: undefined,
        extensions: [],
        name: 'mockerrors',
        stack: undefined
      }]
    );


    controller.verify();

    expect(component.boxOpenings.length).toEqual(0);
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
