import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router instance

  if (localStorage.getItem('token')) {
    return true;
  }
  router.navigateByUrl('/auth'); // Redirect if not authenticated
  return false;
};
