import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeakersInputComponent } from './speakers-input.component';

describe('speakersInputComponent', () => {
  let component: SpeakersInputComponent;
  let fixture: ComponentFixture<SpeakersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakersInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
