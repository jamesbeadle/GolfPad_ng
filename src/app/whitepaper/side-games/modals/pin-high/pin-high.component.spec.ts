import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinHighComponent } from './pin-high.component';

describe('PinHighComponent', () => {
  let component: PinHighComponent;
  let fixture: ComponentFixture<PinHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinHighComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
