import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTypeRowComponent } from './notification-type-row.component';

describe('NotificationTypeRowComponent', () => {
  let component: NotificationTypeRowComponent;
  let fixture: ComponentFixture<NotificationTypeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTypeRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTypeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
