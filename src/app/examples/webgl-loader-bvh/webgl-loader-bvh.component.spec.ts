import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderBvhComponent } from './webgl-loader-bvh.component';

describe('WebglLoaderBvhComponent', () => {
  let component: WebglLoaderBvhComponent;
  let fixture: ComponentFixture<WebglLoaderBvhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderBvhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderBvhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
