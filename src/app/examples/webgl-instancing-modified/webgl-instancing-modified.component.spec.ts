import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInstancingModifiedComponent } from './webgl-instancing-modified.component';

describe('WebglInstancingModifiedComponent', () => {
  let component: WebglInstancingModifiedComponent;
  let fixture: ComponentFixture<WebglInstancingModifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInstancingModifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInstancingModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
