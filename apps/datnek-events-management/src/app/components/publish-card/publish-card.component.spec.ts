import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishCardComponent } from './publish-card.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

describe('PublishCardComponent', () => {
  let component: PublishCardComponent;
  let fixture: ComponentFixture<PublishCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishCardComponent, TranslateModule.forRoot()],
      providers: [TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
