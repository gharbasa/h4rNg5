import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContractNotesComponent } from './house-contract-notes.component';

describe('HouseContractNotesComponent', () => {
  let component: HouseContractNotesComponent;
  let fixture: ComponentFixture<HouseContractNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseContractNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseContractNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
