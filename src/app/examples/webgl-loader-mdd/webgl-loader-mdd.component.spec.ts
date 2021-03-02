import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMddComponent } from './webgl-loader-mdd.component';

describe('WebglLoaderMddComponent', () => {
  let component: WebglLoaderMddComponent;
  let fixture: ComponentFixture<WebglLoaderMddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
