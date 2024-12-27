import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerveComponent } from './merve.component';

describe('MerveComponent', () => {
  let component: MerveComponent;
  let fixture: ComponentFixture<MerveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
