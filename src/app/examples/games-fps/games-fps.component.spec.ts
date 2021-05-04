import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesFpsComponent } from './games-fps.component';

describe('GamesFpsComponent', () => {
  let component: GamesFpsComponent;
  let fixture: ComponentFixture<GamesFpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesFpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesFpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
