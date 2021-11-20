import { OpenBoxModalService } from './open-box-modal.service';
import { TestBed } from '@angular/core/testing';

describe('OpenBoxModalService', () => {
  let service: OpenBoxModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenBoxModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
