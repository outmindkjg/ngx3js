import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMmdAudioComponent } from './webgl-loader-mmd-audio.component';

describe('WebglLoaderMmdAudioComponent', () => {
  let component: WebglLoaderMmdAudioComponent;
  let fixture: ComponentFixture<WebglLoaderMmdAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMmdAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMmdAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
