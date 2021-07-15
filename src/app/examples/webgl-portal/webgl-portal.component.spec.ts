import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglPortalComponent } from './webgl-portal.component';

describe('WebglPortalComponent', () => {
  let component: WebglPortalComponent;
  let fixture: ComponentFixture<WebglPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
