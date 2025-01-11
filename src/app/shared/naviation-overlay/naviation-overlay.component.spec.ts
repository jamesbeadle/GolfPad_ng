import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviationOverlayComponent } from './naviation-overlay.component';

describe('NaviationOverlayComponent', () => {
  let component: NaviationOverlayComponent;
  let fixture: ComponentFixture<NaviationOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaviationOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
