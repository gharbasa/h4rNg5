import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSearchResultsComponent } from './house-search-results.component';

describe('HouseSearchResultsComponent', () => {
  let component: HouseSearchResultsComponent;
  let fixture: ComponentFixture<HouseSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
