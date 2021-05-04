import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMorphtargetsComponent } from './webgl-morphtargets.component';

describe('WebglMorphtargetsComponent', () => {
  let component: WebglMorphtargetsComponent;
  let fixture: ComponentFixture<WebglMorphtargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMorphtargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMorphtargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
