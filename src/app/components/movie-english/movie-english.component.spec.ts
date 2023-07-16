import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEnglishComponent } from './movie-english.component';

describe('MovieEnglishComponent', () => {
  let component: MovieEnglishComponent;
  let fixture: ComponentFixture<MovieEnglishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieEnglishComponent]
    });
    fixture = TestBed.createComponent(MovieEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
