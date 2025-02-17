import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

describe('PublishCardComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, TranslateModule.forRoot()],
      providers: [TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
