import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebxrVrHandinputProfilesComponent } from './webxr-vr-handinput-profiles.component';

describe('WebxrVrHandinputProfilesComponent', () => {
  let component: WebxrVrHandinputProfilesComponent;
  let fixture: ComponentFixture<WebxrVrHandinputProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebxrVrHandinputProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebxrVrHandinputProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
