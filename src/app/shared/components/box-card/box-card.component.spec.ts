import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OpenBoxModalService } from 'src/app/services/open-box-modal/open-box-modal.service';
import Observable from 'zen-observable';
import { Box } from '../../models/boxes.model';

import { BoxCardComponent } from './box-card.component';

describe('BoxCardComponent', () => {
  let component: BoxCardComponent;
  let fixture: ComponentFixture<BoxCardComponent>;
  let openBoxModalService: OpenBoxModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxCardComponent],
      providers: [OpenBoxModalService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCardComponent);
    component = fixture.componentInstance;

    openBoxModalService = TestBed.inject(OpenBoxModalService);

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
    }

    component.boxData = boxData;

    spyOn(openBoxModalService, 'open');

    component.openModal();

    expect(component.boxData.id).toEqual(boxData.id);
    expect(openBoxModalService.open).toHaveBeenCalledWith({ data: { boxId: boxData.id } });
  })

});
