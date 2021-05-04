import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderNodesComponent } from './webgl-loader-nodes.component';

describe('WebglLoaderNodesComponent', () => {
  let component: WebglLoaderNodesComponent;
  let fixture: ComponentFixture<WebglLoaderNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
