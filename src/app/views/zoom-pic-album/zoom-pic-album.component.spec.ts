import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomPicAlbumComponent } from './zoom-pic-album.component';

describe('ZoomPicAlbumComponent', () => {
  let component: ZoomPicAlbumComponent;
  let fixture: ComponentFixture<ZoomPicAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomPicAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomPicAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
