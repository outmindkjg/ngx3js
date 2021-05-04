import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2MaterialsTexture2darrayComponent } from './webgl2-materials-texture2darray.component';

describe('Webgl2MaterialsTexture2darrayComponent', () => {
  let component: Webgl2MaterialsTexture2darrayComponent;
  let fixture: ComponentFixture<Webgl2MaterialsTexture2darrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2MaterialsTexture2darrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2MaterialsTexture2darrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
