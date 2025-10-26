import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredCourses: Course[] = [];
  categories: Category[] = [];
  isLoading = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.courseService.getFeaturedCourses().subscribe(courses => {
      this.featuredCourses = courses;
      this.isLoading = false;
    });

    this.courseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
