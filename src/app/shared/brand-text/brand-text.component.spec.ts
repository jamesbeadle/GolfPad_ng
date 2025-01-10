import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTextComponent } from './brand-text.component';

describe('BrandTextComponent', () => {
  let component: BrandTextComponent;
  let fixture: ComponentFixture<BrandTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
