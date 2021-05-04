import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglShadowmeshComponent } from './webgl-shadowmesh.component';

describe('WebglShadowmeshComponent', () => {
  let component: WebglShadowmeshComponent;
  let fixture: ComponentFixture<WebglShadowmeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglShadowmeshComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglShadowmeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
