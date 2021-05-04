import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMorphtargetsHorseComponent } from './webgl-morphtargets-horse.component';

describe('WebglMorphtargetsHorseComponent', () => {
  let component: WebglMorphtargetsHorseComponent;
  let fixture: ComponentFixture<WebglMorphtargetsHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMorphtargetsHorseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMorphtargetsHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
