import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent {}
