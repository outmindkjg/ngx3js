import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderIfcComponent } from './webgl-loader-ifc.component';

describe('WebglLoaderIfcComponent', () => {
  let component: WebglLoaderIfcComponent;
  let fixture: ComponentFixture<WebglLoaderIfcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderIfcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderIfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
