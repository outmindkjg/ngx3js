import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscLegacyComponent } from './misc-legacy.component';

describe('MiscLegacyComponent', () => {
  let component: MiscLegacyComponent;
  let fixture: ComponentFixture<MiscLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscLegacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
