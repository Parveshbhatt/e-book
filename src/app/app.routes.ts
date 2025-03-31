import { Routes } from '@angular/router';
import { unauthGuard } from './guards/unauth.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes),
    canMatch: [unauthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes),
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];
