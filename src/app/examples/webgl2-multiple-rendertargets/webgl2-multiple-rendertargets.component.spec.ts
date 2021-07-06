import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2MultipleRendertargetsComponent } from './webgl2-multiple-rendertargets.component';

describe('Webgl2MultipleRendertargetsComponent', () => {
  let component: Webgl2MultipleRendertargetsComponent;
  let fixture: ComponentFixture<Webgl2MultipleRendertargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2MultipleRendertargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2MultipleRendertargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
