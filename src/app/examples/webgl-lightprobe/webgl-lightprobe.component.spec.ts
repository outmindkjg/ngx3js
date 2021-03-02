import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLightprobeComponent } from './webgl-lightprobe.component';

describe('WebglLightprobeComponent', () => {
  let component: WebglLightprobeComponent;
  let fixture: ComponentFixture<WebglLightprobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLightprobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLightprobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
