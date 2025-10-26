export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorId: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  rating: number;
  studentsEnrolled: number;
  lessons: Lesson[];
  whatYouLearn: string[];
  requirements: string[];
  tags: string[];
  isFeatured?: boolean;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  resources?: Resource[];
}

export interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'article';
  url: string;
}
