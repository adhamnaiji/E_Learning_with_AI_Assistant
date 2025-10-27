const COURSES = [
  {
    id: 1,
    title: 'Complete Angular Developer Course',
    description: 'Master Angular from scratch with hands-on projects and real-world applications',
    instructor: 'John Smith',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '40 hours',
    price: 89.99,
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
        description: 'Get started with Angular framework. Learn about Angular architecture, setup development environment, and create your first Angular application.'
      },
      {
        id: 2,
        title: 'Components and Templates',
        duration: '25:45',
        videoUrl: 'https://www.youtube.com/embed/23AeJZg4mIE',
        description: 'Deep dive into Angular components. Learn about component lifecycle, data binding, property binding, event binding, and template syntax.'
      },
      {
        id: 3,
        title: 'Services and Dependency Injection',
        duration: '30:20',
        videoUrl: 'https://www.youtube.com/embed/0BikjL858OQ',
        description: 'Understanding Angular services and dependency injection. Learn how to create services, inject them into components, and share data between components.'
      }
    ]
  }
  // Add more courses...
];

// Prefer an explicit API URL (useful when `localhost` resolves to IPv6 ::1).
// You can override by setting the API_URL environment variable, e.g.:
//    API_URL=http://127.0.0.1:8000 node scripts/index-courses.js
// Access process.env with bracket notation to satisfy TS index signature typing
// API_BASE should point to the server root (no trailing /api)
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
        content: contentParts.join('\n'),  // Rich formatted content
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
