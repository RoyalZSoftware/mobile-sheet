import { TestBed } from '@angular/core/testing';

import { MobileSheetService } from './mobile-sheet.service';

describe('MobileSheetService', () => {
  let service: MobileSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
