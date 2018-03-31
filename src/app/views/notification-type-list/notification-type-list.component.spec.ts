import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypeListComponent } from './notification-type-list.component';

describe('NotificationTypeListComponent', () => {
  let component: NotificationTypeListComponent;
  let fixture: ComponentFixture<NotificationTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
