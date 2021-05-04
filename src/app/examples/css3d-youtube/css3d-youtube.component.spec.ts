import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Css3dYoutubeComponent } from './css3d-youtube.component';

describe('Css3dYoutubeComponent', () => {
  let component: Css3dYoutubeComponent;
  let fixture: ComponentFixture<Css3dYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Css3dYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Css3dYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
