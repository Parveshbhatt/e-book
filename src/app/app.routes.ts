import { Routes } from '@angular/router';
import { unauthGuard } from './guards/unauth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
    // canMatch: [unauthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes),
    // canMatch: [unauthGuard]
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];
