import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglRefractionComponent } from './webgl-refraction.component';

describe('WebglRefractionComponent', () => {
  let component: WebglRefractionComponent;
  let fixture: ComponentFixture<WebglRefractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglRefractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglRefractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
