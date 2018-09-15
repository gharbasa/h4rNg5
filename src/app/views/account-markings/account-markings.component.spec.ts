import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMarkingsComponent } from './account-markings.component';

describe('AccountMarkingsComponent', () => {
  let component: AccountMarkingsComponent;
  let fixture: ComponentFixture<AccountMarkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMarkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMarkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
