import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLensflaresComponent } from './webgl-lensflares.component';

describe('WebglLensflaresComponent', () => {
  let component: WebglLensflaresComponent;
  let fixture: ComponentFixture<WebglLensflaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLensflaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLensflaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
