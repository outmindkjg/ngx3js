import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglInteractiveVoxelpainterComponent } from './webgl-interactive-voxelpainter.component';

describe('WebglInteractiveVoxelpainterComponent', () => {
  let component: WebglInteractiveVoxelpainterComponent;
  let fixture: ComponentFixture<WebglInteractiveVoxelpainterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglInteractiveVoxelpainterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglInteractiveVoxelpainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
