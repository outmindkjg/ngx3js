import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPostprocessingNodesComponent } from './webgl-postprocessing-nodes.component';

describe('WebglPostprocessingNodesComponent', () => {
  let component: WebglPostprocessingNodesComponent;
  let fixture: ComponentFixture<WebglPostprocessingNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPostprocessingNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPostprocessingNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
