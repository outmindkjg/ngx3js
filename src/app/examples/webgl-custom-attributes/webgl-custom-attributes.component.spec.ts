import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCustomAttributesComponent } from './webgl-custom-attributes.component';

describe('WebglCustomAttributesComponent', () => {
  let component: WebglCustomAttributesComponent;
  let fixture: ComponentFixture<WebglCustomAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglCustomAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCustomAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
