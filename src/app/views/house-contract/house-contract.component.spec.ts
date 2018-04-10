import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContractComponent } from './house-contract.component';

describe('HouseContractComponent', () => {
  let component: HouseContractComponent;
  let fixture: ComponentFixture<HouseContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
