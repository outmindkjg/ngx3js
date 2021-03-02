import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderMf3MaterialsComponent } from './webgl-loader-mf3-materials.component';

describe('WebglLoaderMf3MaterialsComponent', () => {
  let component: WebglLoaderMf3MaterialsComponent;
  let fixture: ComponentFixture<WebglLoaderMf3MaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderMf3MaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderMf3MaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
