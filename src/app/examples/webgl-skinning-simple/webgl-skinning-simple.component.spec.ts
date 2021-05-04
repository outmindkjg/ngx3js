import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglSkinningSimpleComponent } from './webgl-skinning-simple.component';

describe('WebglSkinningSimpleComponent', () => {
  let component: WebglSkinningSimpleComponent;
  let fixture: ComponentFixture<WebglSkinningSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglSkinningSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglSkinningSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
