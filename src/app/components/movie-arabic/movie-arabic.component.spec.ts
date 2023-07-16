import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieArabicComponent } from './movie-arabic.component';

describe('MovieArabicComponent', () => {
  let component: MovieArabicComponent;
  let fixture: ComponentFixture<MovieArabicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieArabicComponent]
    });
    fixture = TestBed.createComponent(MovieArabicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
