import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
      },
      {
        path: 'books/:id', loadComponent: () => import('./components/book-detail/book-detail.component').then((c) => c.BookDetailComponent)
      }
    ]
  }
];
