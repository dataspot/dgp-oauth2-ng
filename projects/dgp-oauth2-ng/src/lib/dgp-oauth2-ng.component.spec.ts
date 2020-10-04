import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgpOauth2Component } from './dgp-oauth2-ng.component';

describe('DgpOauth2Component', () => {
  let component: DgpOauth2Component;
  let fixture: ComponentFixture<DgpOauth2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgpOauth2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgpOauth2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
