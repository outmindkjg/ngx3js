import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMirrorNodesComponent } from './webgl-mirror-nodes.component';

describe('WebglMirrorNodesComponent', () => {
  let component: WebglMirrorNodesComponent;
  let fixture: ComponentFixture<WebglMirrorNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMirrorNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMirrorNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
