import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicAlbumComponent } from './pic-album.component';

describe('PicAlbumComponent', () => {
  let component: PicAlbumComponent;
  let fixture: ComponentFixture<PicAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
