import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHouseLinksComponent } from './user-house-links.component';

describe('UserHouseLinksComponent', () => {
  let component: UserHouseLinksComponent;
  let fixture: ComponentFixture<UserHouseLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHouseLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHouseLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
