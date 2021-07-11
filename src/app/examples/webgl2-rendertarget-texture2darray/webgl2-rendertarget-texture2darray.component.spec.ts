import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2RendertargetTexture2darrayComponent } from './webgl2-rendertarget-texture2darray.component';

describe('Webgl2RendertargetTexture2darrayComponent', () => {
  let component: Webgl2RendertargetTexture2darrayComponent;
  let fixture: ComponentFixture<Webgl2RendertargetTexture2darrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2RendertargetTexture2darrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2RendertargetTexture2darrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
