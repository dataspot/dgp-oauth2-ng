import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetkeyNg2AuthComponent } from './budgetkey-ng2-auth.component';

describe('BudgetkeyNg2AuthComponent', () => {
  let component: BudgetkeyNg2AuthComponent;
  let fixture: ComponentFixture<BudgetkeyNg2AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetkeyNg2AuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetkeyNg2AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
