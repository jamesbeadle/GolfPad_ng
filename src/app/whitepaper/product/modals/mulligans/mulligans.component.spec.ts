import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulligansComponent } from './mulligans.component';

describe('MulligansComponent', () => {
  let component: MulligansComponent;
  let fixture: ComponentFixture<MulligansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MulligansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MulligansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
