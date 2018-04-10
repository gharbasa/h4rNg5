import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContractsComponent } from './house-contracts.component';

describe('HouseContractsComponent', () => {
  let component: HouseContractsComponent;
  let fixture: ComponentFixture<HouseContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
