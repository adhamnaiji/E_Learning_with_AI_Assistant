import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  enrolledCourses: Course[] = [];
  isLoading = true;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadEnrolledCourses();
  }

  loadEnrolledCourses(): void {
    const enrolledIds = this.authService.getEnrolledCourses();
    
    this.courseService.getAllCourses().subscribe(courses => {
      this.enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));
      this.isLoading = false;
    });
  }

  calculateProgress(course: Course): number {
    // Mock progress calculation
    return Math.floor(Math.random() * 100);
  }
}
