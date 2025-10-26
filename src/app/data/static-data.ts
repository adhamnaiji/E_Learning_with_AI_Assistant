import { Category } from '../models/category.model';
import { Course } from '../models/course.model';
import { User } from '../models/user.model';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Web Development', icon: '💻', courseCount: 25 },
  { id: 2, name: 'Mobile Development', icon: '📱', courseCount: 15 },
  { id: 3, name: 'Data Science', icon: '📊', courseCount: 20 },
  { id: 4, name: 'Machine Learning', icon: '🤖', courseCount: 18 },
  { id: 5, name: 'Design', icon: '🎨', courseCount: 12 },
  { id: 6, name: 'Business', icon: '💼', courseCount: 10 },
  { id: 7, name: 'Marketing', icon: '📈', courseCount: 8 },
  { id: 8, name: 'Photography', icon: '📷', courseCount: 6 }
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Complete Angular Developer Course',
    description: 'Master Angular from scratch with hands-on projects and real-world applications',
    instructor: 'John Smith',
    instructorId: 1,
    category: 'Web Development',
    level: 'Intermediate',
    duration: '40 hours',
    price: 89.99,
    originalPrice: 149.99,
    thumbnail: 'https://via.placeholder.com/400x250/4A90E2/ffffff?text=Angular+Course',
    rating: 4.8,
    studentsEnrolled: 15420,
    isFeatured: true,
    tags: ['Angular', 'TypeScript', 'Web Development'],
    whatYouLearn: [
      'Build complete Angular applications from scratch',
      'Master Angular components, directives, and services',
      'Work with RxJS and reactive programming',
      'Implement routing and authentication',
      'Deploy Angular apps to production'
    ],
    requirements: [
      'Basic HTML, CSS, and JavaScript knowledge',
      'Understanding of programming concepts',
      'A computer with internet connection'
    ],
    lessons: [
      {
        id: 1,
        title: 'Introduction to Angular',
        duration: '15:30',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Get started with Angular framework',
        resources: [
          { id: 1, title: 'Angular Setup Guide', type: 'pdf', url: '#' },
          { id: 2, title: 'Course Resources', type: 'article', url: '#' }
        ]
      },
      {
        id: 2,
        title: 'Components and Templates',
        duration: '25:45',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Learn about Angular components',
        resources: []
      },
      {
        id: 3,
        title: 'Services and Dependency Injection',
        duration: '30:20',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Understanding Angular services',
        resources: []
      },
      {
        id: 4,
        title: 'Routing and Navigation',
        duration: '28:15',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Implement routing in Angular',
        resources: []
      }
    ]
  },
  {
    id: 2,
    title: 'React JS Masterclass',
    description: 'Learn React JS with Redux, Hooks, and modern best practices',
    instructor: 'Sarah Johnson',
    instructorId: 2,
    category: 'Web Development',
    level: 'Beginner',
    duration: '35 hours',
    price: 79.99,
    originalPrice: 129.99,
    thumbnail: 'https://via.placeholder.com/400x250/61DAFB/000000?text=React+Course',
    rating: 4.7,
    studentsEnrolled: 18200,
    isFeatured: true,
    tags: ['React', 'JavaScript', 'Frontend'],
    whatYouLearn: [
      'Build modern React applications',
      'Master React Hooks and Context API',
      'State management with Redux',
      'Testing React components',
      'Performance optimization'
    ],
    requirements: [
      'JavaScript fundamentals',
      'Basic understanding of HTML and CSS'
    ],
    // Update the lessons in your COURSES array like this:
lessons: [
  {
    id: 1,
    title: 'Introduction to Angular',
    duration: '15:30',
    videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo', // Angular Tutorial
    description: 'Get started with Angular framework and learn the basics',
    resources: [
      { id: 1, title: 'Angular Setup Guide', type: 'pdf', url: '#' },
      { id: 2, title: 'Course Resources', type: 'article', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'Components and Templates',
    duration: '25:45',
    videoUrl: 'https://www.youtube.com/embed/23AeJZg4mIE', // Angular Components
    description: 'Learn about Angular components and how to create dynamic templates',
    resources: []
  },
  {
    id: 3,
    title: 'Services and Dependency Injection',
    duration: '30:20',
    videoUrl: 'https://www.youtube.com/embed/0BikjL858OQ', // Angular Services
    description: 'Understanding Angular services and dependency injection patterns',
    resources: []
  },
  {
    id: 4,
    title: 'Routing and Navigation',
    duration: '28:15',
    videoUrl: 'https://www.youtube.com/embed/Nehk4tBxD4o', // Angular Routing
    description: 'Implement routing and navigation in your Angular applications',
    resources: []
  }
]

  },
  {
    id: 3,
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and visualization',
    instructor: 'Michael Chen',
    instructorId: 3,
    category: 'Data Science',
    level: 'Beginner',
    duration: '45 hours',
    price: 94.99,
    originalPrice: 159.99,
    thumbnail: 'https://via.placeholder.com/400x250/3776AB/ffffff?text=Python+Data+Science',
    rating: 4.9,
    studentsEnrolled: 22500,
    isFeatured: true,
    tags: ['Python', 'Data Science', 'Machine Learning'],
    whatYouLearn: [
      'Python programming fundamentals',
      'Data analysis with Pandas and NumPy',
      'Data visualization with Matplotlib',
      'Machine learning basics with Scikit-learn',
      'Real-world data science projects'
    ],
    requirements: [
      'No prior programming experience needed',
      'Basic mathematics knowledge'
    ],
    lessons: [
      {
        id: 1,
        title: 'Python Basics',
        duration: '30:00',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Introduction to Python',
        resources: []
      }
    ]
  },
  {
    id: 4,
    title: 'Machine Learning A-Z',
    description: 'Complete hands-on machine learning tutorial with Python',
    instructor: 'Emma Davis',
    instructorId: 4,
    category: 'Machine Learning',
    level: 'Advanced',
    duration: '50 hours',
    price: 99.99,
    thumbnail: 'https://via.placeholder.com/400x250/FF6B6B/ffffff?text=Machine+Learning',
    rating: 4.8,
    studentsEnrolled: 19800,
    tags: ['Machine Learning', 'AI', 'Python'],
    whatYouLearn: [
      'Supervised and unsupervised learning',
      'Neural networks and deep learning',
      'Natural language processing',
      'Computer vision projects',
      'Model deployment'
    ],
    requirements: [
      'Python programming experience',
      'Statistics and linear algebra basics'
    ],
    lessons: [
      {
        id: 1,
        title: 'ML Introduction',
        duration: '25:00',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Getting started with ML',
        resources: []
      }
    ]
  },
  {
    id: 5,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn professional UI/UX design principles and tools',
    instructor: 'David Wilson',
    instructorId: 5,
    category: 'Design',
    level: 'Beginner',
    duration: '30 hours',
    price: 74.99,
    thumbnail: 'https://via.placeholder.com/400x250/9B59B6/ffffff?text=UI+UX+Design',
    rating: 4.6,
    studentsEnrolled: 12300,
    tags: ['UI', 'UX', 'Design'],
    whatYouLearn: [
      'Design thinking process',
      'User research and personas',
      'Wireframing and prototyping',
      'Figma and Adobe XD',
      'Portfolio projects'
    ],
    requirements: [
      'No design experience needed',
      'Creative mindset'
    ],
    lessons: [
      {
        id: 1,
        title: 'Design Principles',
        duration: '18:00',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Core design concepts',
        resources: []
      }
    ]
  },
  {
    id: 6,
    title: 'Mobile App Development with Flutter',
    description: 'Build beautiful native mobile apps with Flutter',
    instructor: 'Lisa Anderson',
    instructorId: 6,
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '38 hours',
    price: 84.99,
    thumbnail: 'https://via.placeholder.com/400x250/02569B/ffffff?text=Flutter+Development',
    rating: 4.7,
    studentsEnrolled: 14500,
    tags: ['Flutter', 'Dart', 'Mobile'],
    whatYouLearn: [
      'Flutter framework and Dart',
      'Building responsive UI',
      'State management',
      'Firebase integration',
      'Publishing to app stores'
    ],
    requirements: [
      'Basic programming knowledge',
      'OOP concepts understanding'
    ],
    lessons: [
      {
        id: 1,
        title: 'Flutter Basics',
        duration: '22:00',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Introduction to Flutter',
        resources: []
      }
    ]
  }
];

export const USERS: User[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?img=45'
  }
];
