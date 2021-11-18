import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBoxModalComponent } from './open-box-modal.component';

describe('OpenBoxModalComponent', () => {
  let component: OpenBoxModalComponent;
  let fixture: ComponentFixture<OpenBoxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBoxModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
