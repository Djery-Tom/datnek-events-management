import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverImageInputComponent } from './cover-image-input.component';

describe('CoverImageInputComponent', () => {
  let component: CoverImageInputComponent;
  let fixture: ComponentFixture<CoverImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverImageInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
