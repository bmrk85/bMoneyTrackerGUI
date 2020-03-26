import { TestBed } from '@angular/core/testing';

import { SpendingService } from './spending.service';

describe('SpendingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpendingService = TestBed.get(SpendingService);
    expect(service).toBeTruthy();
  });
});
