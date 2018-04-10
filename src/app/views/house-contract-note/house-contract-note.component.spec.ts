import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContractNoteComponent } from './house-contract-note.component';

describe('HouseContractNoteComponent', () => {
  let component: HouseContractNoteComponent;
  let fixture: ComponentFixture<HouseContractNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseContractNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseContractNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
