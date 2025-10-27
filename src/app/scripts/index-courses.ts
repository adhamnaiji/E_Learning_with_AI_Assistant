const COURSES = [
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
    thumbnail: 'assets/Angular.jpg',
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
    thumbnail: 'assets/Reactjs.jpg',
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
    lessons: [
      {
        id: 1,
        title: 'React Fundamentals',
        duration: '20:00',
        videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk',
        description: 'Get started with React and learn the basics',
        resources: [
          { id: 1, title: 'React Setup Guide', type: 'pdf', url: '#' },
          { id: 2, title: 'Course Resources', type: 'article', url: '#' }
        ]
      },
      {
        id: 2,
        title: 'React Hooks Deep Dive',
        duration: '30:00',
        videoUrl: 'https://www.youtube.com/embed/23AeJZg4mIE',
        description: 'Master useState, useEffect, and custom hooks',
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
    thumbnail: 'assets/python.jpg',
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
    thumbnail: 'assets/machine_learning.jpg',
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
    thumbnail: 'assets/UiUx.jpg',
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
    thumbnail: 'assets/Flutter.jpg',
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

// Prefer an explicit API URL (useful when `localhost` resolves to IPv6 ::1).
const API_BASE = (process.env['API_URL'] as string) || 'http://127.0.0.1:8000';

async function indexAllCourses() {
  console.log('🚀 Starting to index courses...\n');
  
  for (const course of COURSES) {
    try {
      // Build rich content string
      const contentParts = [
        `Course Title: ${course.title}`,
        `Instructor: ${course.instructor}`,
        `Category: ${course.category}`,
        `Level: ${course.level}`,
        `Duration: ${course.duration}`,
        `Description: ${course.description}`,
        '',
        'What You Will Learn:',
        ...course.whatYouLearn.map((item, i) => `${i + 1}. ${item}`),
        '',
        'Requirements:',
        ...course.requirements.map((item, i) => `${i + 1}. ${item}`),
        '',
        'Course Lessons and Videos:',
        ...course.lessons.map(lesson => 
          `Lesson: ${lesson.title} (${lesson.duration}) - ${lesson.description}`
        )
      ];

      const courseData = {
        id: course.id,
        course_id: course.id,
        title: course.title,
        description: course.description,
        content: contentParts.join('\n'),
        instructor: course.instructor,
        category: course.category,
        level: course.level
      };

      const response = await fetch(`${API_BASE}/api/index-course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });
      
      if (response.ok) {
        console.log(`✅ ${course.title}`);
      } else {
        const body = await response.text();
        console.log(`❌ Failed: ${course.title} (status ${response.status})`);
        console.error('Response body:', body);
      }
    } catch (error) {
      console.error(`❌ Error: ${course.title} -`, error instanceof Error ? error.message : 'Unknown error');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n✅ Indexing complete!');
}

// Run
(async () => {
  try {
    const backendCheck = await fetch(`${API_BASE}/health`);
    if (backendCheck.ok) {
      console.log('✅ Backend is running\n');
      await indexAllCourses();
    } else {
      console.error('❌ Backend responded with status', backendCheck.status);
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Cannot reach backend at ${API_BASE} — make sure the backend API is running.`);
    console.error('Error:', err && err.message ? err.message : err);
    console.error('\nTip: If your backend is on a different host/port, set the API_URL env var and re-run:');
    console.error('  API_URL=http://127.0.0.1:8000 node scripts/index-courses.js');
    process.exit(1);
  }
})();
