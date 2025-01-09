import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextUpComponent } from './next-up.component';

describe('NextUpComponent', () => {
  let component: NextUpComponent;
  let fixture: ComponentFixture<NextUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
