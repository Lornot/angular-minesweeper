import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWinDialogComponent } from './game-win-dialog.component';

describe('GameWinDialogComponent', () => {
  let component: GameWinDialogComponent;
  let fixture: ComponentFixture<GameWinDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWinDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
