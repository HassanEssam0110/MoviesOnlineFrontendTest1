import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsuelHomeComponent } from './carsuel-home.component';

describe('CarsuelHomeComponent', () => {
  let component: CarsuelHomeComponent;
  let fixture: ComponentFixture<CarsuelHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsuelHomeComponent]
    });
    fixture = TestBed.createComponent(CarsuelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
