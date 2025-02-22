import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PostComponent, EventComponent , HeaderComponent } from '../../components';

@Component({
  selector: 'lib-events-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    PostComponent,
    EventComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
