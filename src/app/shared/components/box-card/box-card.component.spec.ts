import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Box } from '../../models/boxes.model';
import { BoxCardComponent } from './box-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BoxCardComponent', () => {
  let component: BoxCardComponent;
  let fixture: ComponentFixture<BoxCardComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxCardComponent],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCardComponent);
    component = fixture.componentInstance;

    matDialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select qt', () => {
    component.selectQt(2);
    expect(component.selectedQt).toEqual(2);
  });

  it('should handle open case button click without emit', () => {
    spyOn(component, 'openModal');
    component.handleOpenCaseClick();
    expect(component.openModal).toHaveBeenCalledWith();
  });

  it('should handle open case button click with emit', () => {
    component.hasCustomClick = true;
    component.selectedQt = 2;
    spyOn(component.customClick, 'emit');
    component.handleOpenCaseClick();
    expect(component.customClick.emit).toHaveBeenCalledWith({ quantity: 2 });
  });

  it('should open modal', () => {
    const boxData: Box = {
      cost: 100,
      iconUrl: 'mockiconUrl',
      id: 'mockId',
      name: 'mockname',
    };

    component.boxData = boxData;
    spyOn(matDialog, 'open');
    component.openModal();
    expect(component.boxData.id).toEqual(boxData.id);
    expect(matDialog.open).toHaveBeenCalled();
  });
});
