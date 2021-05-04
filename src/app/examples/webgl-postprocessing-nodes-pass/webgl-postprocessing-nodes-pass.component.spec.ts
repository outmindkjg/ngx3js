import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingNodesPassComponent } from './webgl-postprocessing-nodes-pass.component';

describe('WebglPostprocessingNodesPassComponent', () => {
  let component: WebglPostprocessingNodesPassComponent;
  let fixture: ComponentFixture<WebglPostprocessingNodesPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingNodesPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingNodesPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
