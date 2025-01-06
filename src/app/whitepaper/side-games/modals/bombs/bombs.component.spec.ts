import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombsComponent } from './bombs.component';

describe('BombsComponent', () => {
  let component: BombsComponent;
  let fixture: ComponentFixture<BombsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BombsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BombsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
