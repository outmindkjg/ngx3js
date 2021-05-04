import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCustomAttributesPointsComponent } from './webgl-custom-attributes-points.component';

describe('WebglCustomAttributesPointsComponent', () => {
  let component: WebglCustomAttributesPointsComponent;
  let fixture: ComponentFixture<WebglCustomAttributesPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCustomAttributesPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCustomAttributesPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
