import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildItComponent } from './build-it.component';

describe('BuildItComponent', () => {
  let component: BuildItComponent;
  let fixture: ComponentFixture<BuildItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildItComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
