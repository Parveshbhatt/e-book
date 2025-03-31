import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, SignupRequest, User } from '../../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MOCK_USER: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User'
  };

  // Simulated JWT token with user information (This will be generated from the backend)
  private readonly MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  constructor(private router: Router) { }

  login(request: LoginRequest): Observable<string> {
    // Simulate API validation
    if (request.email !== 'test@example.com' || request.password !== 'password') {
      return throwError(() => new Error('Invalid credentials'));
    }

    // Simulate successful API call
    return of(this.MOCK_TOKEN).pipe(
      delay(1000),
      tap(token => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decodedToken));
      })
    );
  }

  signup(request: SignupRequest): Observable<string> {
    // Simulate API validation
    if (request.email === 'test@example.com') {
      return throwError(() => new Error('Email already exists'));
    }

    return of(this.MOCK_TOKEN).pipe(
      delay(1000),
      tap(token => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decodedToken));
      })
    );
  }

  logout(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Simulated JWT validation,  but for now just return true
      return true;
      // const decodedToken: any = jwtDecode(token);
      // const currentTime = Date.now() / 1000;
      // return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}