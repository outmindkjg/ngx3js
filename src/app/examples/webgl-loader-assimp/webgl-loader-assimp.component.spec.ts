import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglLoaderAssimpComponent } from './webgl-loader-assimp.component';

describe('WebglLoaderAssimpComponent', () => {
  let component: WebglLoaderAssimpComponent;
  let fixture: ComponentFixture<WebglLoaderAssimpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglLoaderAssimpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglLoaderAssimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
