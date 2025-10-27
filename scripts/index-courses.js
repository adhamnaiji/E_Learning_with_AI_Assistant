// Your actual courses from static-data.ts
const COURSES = [
  {
    id: 1,
    title: 'Complete Angular Developer Course',
    description: 'Master Angular from scratch with hands-on projects and real-world applications. Learn to build modern, scalable web applications.',
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
      'Deploy Angular apps to production',
      'Use Angular CLI effectively',
      'Handle forms and validation',
      'Work with HTTP and APIs'
    ],
    requirements: [
      'Basic HTML, CSS, and JavaScript knowledge',
      'Understanding of TypeScript is helpful',
      'A computer with internet connection',
      'Node.js installed'
    ],
    lessons: [
      {
        id: 1,
        title: 'Introduction to Angular',
        duration: '15:30',
        videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
        description: 'Get started with Angular framework. Learn about Angular architecture, setup development environment, and create your first Angular application. This lesson covers Angular CLI, project structure, and basic concepts.'
      },
      {
        id: 2,
        title: 'Components and Templates',
        duration: '25:45',
        videoUrl: 'https://www.youtube.com/embed/23AeJZg4mIE',
        description: 'Deep dive into Angular components. Learn about component lifecycle hooks, data binding types (property, event, two-way), template syntax, and how to create reusable components.'
      },
      {
        id: 3,
        title: 'Services and Dependency Injection',
        duration: '30:20',
        videoUrl: 'https://www.youtube.com/embed/0BikjL858OQ',
        description: 'Understanding Angular services and dependency injection patterns. Learn how to create services, inject them into components, share data across the application, and manage application state.'
      },
      {
        id: 4,
        title: 'Routing and Navigation',
        duration: '28:15',
        videoUrl: 'https://www.youtube.com/embed/Nehk4tBxD4o',
        description: 'Implement routing and navigation in Angular applications. Learn about route configuration, route parameters, child routes, route guards, and lazy loading modules.'
      },
      {
        id: 5,
        title: 'Forms and Validation',
        duration: '35:00',
        videoUrl: 'https://www.youtube.com/embed/xYv9lsrV0s4',
        description: 'Master Angular forms including template-driven and reactive forms. Learn form validation, custom validators, form groups, form arrays, and handling form submission.'
      }
    ],
    tags: ['Angular', 'TypeScript', 'Web Development', 'Frontend']
  },
  // Add more courses here...
];

const API_URL = 'http://localhost:8000/api';

async function indexCourse(course) {
  // Build comprehensive content for the course
  const contentParts = [
    `=== COURSE INFORMATION ===`,
    `Course ID: ${course.id}`,
    `Course Title: ${course.title}`,
    `Instructor: ${course.instructor}`,
    `Category: ${course.category}`,
    `Level: ${course.level}`,
    `Duration: ${course.duration}`,
    `Price: $${course.price}`,
    ``,
    `=== DESCRIPTION ===`,
    course.description,
    ``,
    `=== WHAT YOU WILL LEARN ===`,
    ...course.whatYouLearn.map((item, i) => `${i + 1}. ${item}`),
    ``,
    `=== REQUIREMENTS ===`,
    ...course.requirements.map((item, i) => `${i + 1}. ${item}`),
    ``,
    `=== COURSE CONTENT AND LESSONS ===`,
    `This course contains ${course.lessons.length} video lessons:`,
    ``,
    ...course.lessons.map((lesson, i) => 
      `Lesson ${i + 1}: ${lesson.title}\n` +
      `Duration: ${lesson.duration}\n` +
      `Description: ${lesson.description}\n`
    ),
    ``,
    `=== TAGS ===`,
    course.tags ? course.tags.join(', ') : 'No tags'
  ];

  const courseData = {
    course_id: course.id,
    title: course.title,
    description: course.description,
    content: contentParts.join('\n'),
    instructor: course.instructor,
    category: course.category,
    level: course.level
  };

  try {
    const response = await fetch(`${API_URL}/index-course`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
    
    if (response.ok) {
      const result = await response.json();
      return { success: true, course };
    } else {
      const error = await response.text();
      return { success: false, course, error };
    }
  } catch (error) {
    return { success: false, course, error: error.message };
  }
}

async function checkBackend() {
  try {
    const response = await fetch('http://localhost:8000/health');
    if (response.ok) {
      console.log('✅ Backend is running!\n');
      return true;
    }
  } catch (error) {
    console.error('❌ Backend not running!');
    console.error('Start backend with: uvicorn app.main:app --reload --port 8000\n');
    return false;
  }
  return false;
}

async function indexAllCourses() {
  console.log('🚀 Starting Course Indexing Process');
  console.log('='.repeat(60));
  console.log(`📚 Total courses to index: ${COURSES.length}\n`);
  
  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (let i = 0; i < COURSES.length; i++) {
    const course = COURSES[i];
    console.log(`\n[${i + 1}/${COURSES.length}] Indexing: ${course.title}`);
    console.log('  Course ID:', course.id);
    console.log('  Lessons:', course.lessons.length);
    
    const result = await indexCourse(course);
    results.push(result);
    
    if (result.success) {
      console.log(`  ✅ Successfully indexed`);
      successCount++;
    } else {
      console.log(`  ❌ Failed:`, result.error);
      failCount++;
    }
    
    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 INDEXING SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully indexed: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📚 Total: ${COURSES.length}`);
  
  if (successCount > 0) {
    console.log('\n✨ You can now ask questions about:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   - ${r.course.title} (ID: ${r.course.id})`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
}

// Main execution
(async () => {
  const backendRunning = await checkBackend();
  if (backendRunning) {
    await indexAllCourses();
    console.log('\n🎉 Done! Test your chat widget now!');
  }
})();
