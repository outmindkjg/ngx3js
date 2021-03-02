import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLayersComponent } from './webgl-layers.component';

describe('WebglLayersComponent', () => {
  let component: WebglLayersComponent;
  let fixture: ComponentFixture<WebglLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
