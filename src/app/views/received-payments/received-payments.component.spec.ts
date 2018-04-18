import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedPaymentsComponent } from './received-payments.component';

describe('ReceivedPaymentsComponent', () => {
  let component: ReceivedPaymentsComponent;
  let fixture: ComponentFixture<ReceivedPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
