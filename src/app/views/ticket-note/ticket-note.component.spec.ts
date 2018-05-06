import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNoteComponent } from './ticket-note.component';

describe('TicketNoteComponent', () => {
  let component: TicketNoteComponent;
  let fixture: ComponentFixture<TicketNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
