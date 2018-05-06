import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNotesComponent } from './ticket-notes.component';

describe('TicketNotesComponent', () => {
  let component: TicketNotesComponent;
  let fixture: ComponentFixture<TicketNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
