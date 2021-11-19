import { TestBed } from '@angular/core/testing';

import { OpenBoxModalService } from './open-box-modal.service';

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
