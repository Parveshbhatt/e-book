import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const unauthGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router); // Inject Router instance

  const token = localStorage.getItem('authToken');

  if (token) {
    // If the token exists, redirect to a different page and prevent loading the route
    router.navigate(['/']);
    return false; // Prevents loading the route
  }

  return true; // Allows loading the route
};

