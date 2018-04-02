import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePicsComponent } from './house-pics.component';

describe('HousePicsComponent', () => {
  let component: HousePicsComponent;
  let fixture: ComponentFixture<HousePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
