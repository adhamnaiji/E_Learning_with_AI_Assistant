import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Category } from '../../models/category.model';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: Category[] = [];
  selectedCategory = 'All';
  selectedLevel = 'All';
  searchQuery = '';
  isLoading = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadData();
    });
  }

  loadData(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.applyFilters();
      this.isLoading = false;
    });

    this.courseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesCategory = this.selectedCategory === 'All' || course.category === this.selectedCategory;
      const matchesLevel = this.selectedLevel === 'All' || course.level === this.selectedLevel;
      const matchesSearch = !this.searchQuery || 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onLevelChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }
}
