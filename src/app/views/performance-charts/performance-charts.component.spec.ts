import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceChartsComponent } from './performance-charts.component';

describe('PerformanceChartsComponent', () => {
  let component: PerformanceChartsComponent;
  let fixture: ComponentFixture<PerformanceChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
