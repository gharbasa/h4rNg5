import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRowComponent } from './house-row.component';

describe('HouseRowComponent', () => {
  let component: HouseRowComponent;
  let fixture: ComponentFixture<HouseRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
