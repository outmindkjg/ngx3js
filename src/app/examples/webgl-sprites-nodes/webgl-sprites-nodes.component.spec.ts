import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglSpritesNodesComponent } from './webgl-sprites-nodes.component';

describe('WebglSpritesNodesComponent', () => {
  let component: WebglSpritesNodesComponent;
  let fixture: ComponentFixture<WebglSpritesNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglSpritesNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglSpritesNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
