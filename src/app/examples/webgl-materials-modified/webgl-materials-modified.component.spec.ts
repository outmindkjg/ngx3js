import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsModifiedComponent } from './webgl-materials-modified.component';

describe('WebglMaterialsModifiedComponent', () => {
  let component: WebglMaterialsModifiedComponent;
  let fixture: ComponentFixture<WebglMaterialsModifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsModifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsModifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
