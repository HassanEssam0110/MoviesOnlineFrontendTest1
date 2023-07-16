import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediaHomeComponent } from './all-media-home.component';

describe('AllMediaHomeComponent', () => {
  let component: AllMediaHomeComponent;
  let fixture: ComponentFixture<AllMediaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMediaHomeComponent]
    });
    fixture = TestBed.createComponent(AllMediaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
