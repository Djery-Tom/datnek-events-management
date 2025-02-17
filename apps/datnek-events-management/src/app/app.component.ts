import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  imports: [RouterModule],
  standalone : true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Datnek Events Management';

  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle(this.title);
  }
}
