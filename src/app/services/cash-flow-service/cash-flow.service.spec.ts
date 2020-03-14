import { TestBed } from '@angular/core/testing';

import { CashFlowService } from './cash-flow.service';

describe('CashFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashFlowService = TestBed.get(CashFlowService);
    expect(service).toBeTruthy();
  });
});
