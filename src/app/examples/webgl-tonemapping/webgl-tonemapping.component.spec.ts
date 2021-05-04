import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglTonemappingComponent } from './webgl-tonemapping.component';

describe('WebglTonemappingComponent', () => {
  let component: WebglTonemappingComponent;
  let fixture: ComponentFixture<WebglTonemappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglTonemappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglTonemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
