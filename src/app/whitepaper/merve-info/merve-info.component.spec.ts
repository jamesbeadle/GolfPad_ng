import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerveInfoComponent } from './merve-info.component';

describe('MerveInfoComponent', () => {
  let component: MerveInfoComponent;
  let fixture: ComponentFixture<MerveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerveInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
