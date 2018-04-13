import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdleWarningDialogComponent } from './user-idle-warning-dialog.component';

describe('UserIdleWarningDialogComponent', () => {
  let component: UserIdleWarningDialogComponent;
  let fixture: ComponentFixture<UserIdleWarningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdleWarningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdleWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
