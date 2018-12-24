import { TestBed } from '@angular/core/testing';

import { BudgetkeyNg2AuthService } from './budgetkey-ng2-auth.service';

describe('BudgetkeyNg2AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetkeyNg2AuthService = TestBed.get(BudgetkeyNg2AuthService);
    expect(service).toBeTruthy();
  });
});
