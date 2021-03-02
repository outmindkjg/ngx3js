import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderObjComponent } from './webgl-loader-obj.component';

describe('WebglLoaderObjComponent', () => {
  let component: WebglLoaderObjComponent;
  let fixture: ComponentFixture<WebglLoaderObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderObjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
