import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Course } from '../models/course.model';
import { Category } from '../models/category.model';
import { COURSES, CATEGORIES } from '../data/static-data';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = COURSES;
  private categories: Category[] = CATEGORIES;

  getAllCourses(): Observable<Course[]> {
    return of(this.courses).pipe(delay(300));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course).pipe(delay(300));
  }

  getFeaturedCourses(): Observable<Course[]> {
    const featured = this.courses.filter(c => c.isFeatured);
    return of(featured).pipe(delay(300));
  }

  getCoursesByCategory(category: string): Observable<Course[]> {
    const filtered = this.courses.filter(c => c.category === category);
    return of(filtered).pipe(delay(300));
  }

  searchCourses(query: string): Observable<Course[]> {
    const filtered = this.courses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered).pipe(delay(300));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories).pipe(delay(300));
  }
}
