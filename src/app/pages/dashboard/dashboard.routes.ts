import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '', loadComponent: () => import('./components/home/home.component').then((c) => c.HomeComponent)
      }
    ]
  }
];
