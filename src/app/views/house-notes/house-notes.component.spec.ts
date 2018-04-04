import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseNotesComponent } from './house-notes.component';

describe('HouseNotesComponent', () => {
  let component: HouseNotesComponent;
  let fixture: ComponentFixture<HouseNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
