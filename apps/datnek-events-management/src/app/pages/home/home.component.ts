import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
