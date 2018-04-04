import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseNoteComponent } from './house-note.component';

describe('HouseNoteComponent', () => {
  let component: HouseNoteComponent;
  let fixture: ComponentFixture<HouseNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
