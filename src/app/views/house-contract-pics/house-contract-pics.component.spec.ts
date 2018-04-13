import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseContractPicsComponent } from './house-contract-pics.component';

describe('HouseContractPicsComponent', () => {
  let component: HouseContractPicsComponent;
  let fixture: ComponentFixture<HouseContractPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseContractPicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseContractPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
