import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H4rbaseComponent } from './h4rbase.component';

describe('H4rbaseComponent', () => {
  let component: H4rbaseComponent;
  let fixture: ComponentFixture<H4rbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H4rbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H4rbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
