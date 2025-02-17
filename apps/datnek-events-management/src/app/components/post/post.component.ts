import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, TranslatePipe, EventFormComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {}
