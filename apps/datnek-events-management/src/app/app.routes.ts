import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@datnek-events-management/events').then(c => c.HomeComponent)
  }
];
