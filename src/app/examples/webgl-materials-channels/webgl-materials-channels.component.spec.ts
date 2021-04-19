import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglMaterialsChannelsComponent } from './webgl-materials-channels.component';

describe('WebglMaterialsChannelsComponent', () => {
  let component: WebglMaterialsChannelsComponent;
  let fixture: ComponentFixture<WebglMaterialsChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglMaterialsChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglMaterialsChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
