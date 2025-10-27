import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course, Lesson } from '../../models/course.model';
import { AiChatComponent } from '../ai-chat/ai-chat.component';



@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule , AiChatComponent],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  isEnrolled = false;
  isLoading = true;
  selectedLesson = 0;
  currentVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(course => {
      this.course = course;
      this.isLoading = false;
      this.checkEnrollment();
      if (this.course && this.course.lessons.length > 0) {
        this.loadVideo(this.course.lessons[0]);
      }
    });
  }

  checkEnrollment(): void {
    if (this.course && this.authService.isAuthenticated()) {
      const enrolled = this.authService.getEnrolledCourses();
      this.isEnrolled = enrolled.includes(this.course.id);
    }
  }

  enrollCourse(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.course) {
      this.authService.enrollCourse(this.course.id).subscribe(success => {
        if (success) {
          this.isEnrolled = true;
          alert('Successfully enrolled in the course!');
        }
      });
    }
  }

  selectLesson(index: number): void {
    this.selectedLesson = index;
    if (this.course && this.course.lessons[index]) {
      this.loadVideo(this.course.lessons[index]);
    }
  }

  loadVideo(lesson: Lesson): void {
    this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(lesson.videoUrl);
  }
}
