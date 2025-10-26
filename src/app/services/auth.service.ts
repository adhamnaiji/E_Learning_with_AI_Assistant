import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private readonly STORAGE_KEY = 'currentUser';

  constructor() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  login(email: string, password: string): Observable<User> {
    // Mock login - in real app, call backend API
    if (email && password) {
      const mockUser: User = {
        id: 100,
        name: email.split('@')[0],
        email: email,
        role: 'student',
        enrolledCourses: []
      };
      this.currentUser = mockUser;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockUser));
      return of(mockUser).pipe(delay(500));
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  register(name: string, email: string, password: string): Observable<User> {
    // Mock registration
    const newUser: User = {
      id: Date.now(),
      name: name,
      email: email,
      role: 'student',
      enrolledCourses: []
    };
    this.currentUser = newUser;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return of(newUser).pipe(delay(500));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  enrollCourse(courseId: number): Observable<boolean> {
    if (this.currentUser) {
      if (!this.currentUser.enrolledCourses) {
        this.currentUser.enrolledCourses = [];
      }
      if (!this.currentUser.enrolledCourses.includes(courseId)) {
        this.currentUser.enrolledCourses.push(courseId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentUser));
      }
      return of(true).pipe(delay(300));
    }
    return of(false);
  }

  getEnrolledCourses(): number[] {
    return this.currentUser?.enrolledCourses || [];
  }
}
