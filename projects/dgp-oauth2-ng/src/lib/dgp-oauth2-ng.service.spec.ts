import { TestBed } from '@angular/core/testing';

import { DgpOauth2Service } from './dgp-oauth2-ng.service';

describe('DgpOauth2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DgpOauth2Service = TestBed.get(DgpOauth2Service);
    expect(service).toBeTruthy();
  });
});
