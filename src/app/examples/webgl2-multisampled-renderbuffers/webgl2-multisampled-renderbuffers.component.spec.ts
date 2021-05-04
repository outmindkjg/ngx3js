import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Webgl2MultisampledRenderbuffersComponent } from './webgl2-multisampled-renderbuffers.component';

describe('Webgl2MultisampledRenderbuffersComponent', () => {
  let component: Webgl2MultisampledRenderbuffersComponent;
  let fixture: ComponentFixture<Webgl2MultisampledRenderbuffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Webgl2MultisampledRenderbuffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Webgl2MultisampledRenderbuffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
