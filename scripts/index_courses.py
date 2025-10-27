import requests
import json
import time

# Simplified course data - remove nested 'id' fields from lessons
COURSES = [
    {
        "id": 1,
        "title": "Complete Angular Developer Course",
        "description": "Master Angular from scratch with hands-on projects and real-world applications. Learn to build modern, scalable web applications with Angular 17.",
        "instructor": "John Smith",
        "category": "Web Development",
        "level": "Intermediate",
        "duration": "40 hours",
        "price": 89.99,
        "whatYouLearn": [
            "Build complete Angular applications from scratch",
            "Master Angular components, directives, and services",
            "Work with RxJS and reactive programming",
            "Implement routing and authentication",
            "Deploy Angular apps to production",
            "Use Angular CLI effectively",
            "Handle forms and validation",
            "Work with HTTP and APIs"
        ],
        "requirements": [
            "Basic HTML, CSS, and JavaScript knowledge",
            "Understanding of TypeScript is helpful but not required",
            "A computer with internet connection",
            "Node.js installed on your system"
        ],
        "lessons": [
            {
                "title": "Introduction to Angular",  # Removed 'id' field
                "duration": "15:30",
                "description": "Get started with Angular framework. Learn about Angular architecture, setup development environment, create your first Angular application, and understand the Angular CLI."
            },
            {
                "title": "Components and Templates",
                "duration": "25:45",
                "description": "Deep dive into Angular components. Learn about component lifecycle hooks, data binding types (property, event, two-way), template syntax, directives, and how to create reusable components."
            },
            {
                "title": "Services and Dependency Injection",
                "duration": "30:20",
                "description": "Understanding Angular services and dependency injection patterns. Learn how to create services, inject them into components, share data across the application, and manage application state."
            },
            {
                "title": "Routing and Navigation",
                "duration": "28:15",
                "description": "Implement routing and navigation in Angular applications. Learn about route configuration, route parameters, query parameters, child routes, route guards, and lazy loading modules for better performance."
            },
            {
                "title": "Forms and Validation",
                "duration": "35:00",
                "description": "Master Angular forms including template-driven forms and reactive forms. Learn form validation techniques, custom validators, form groups, form arrays, dynamic forms, and handling form submission."
            }
        ],
        "tags": ["Angular", "TypeScript", "Web Development", "Frontend", "JavaScript"]
    }
]

API_URL = "http://localhost:8000/api"

def build_course_content(course):
    """Build rich content for indexing - only use simple data types"""
    content_parts = [
        "=== COURSE INFORMATION ===",
        f"Course ID: {course['id']}",
        f"Course Title: {course['title']}",
        f"Instructor: {course['instructor']}",
        f"Category: {course['category']}",
        f"Level: {course['level']}",
        f"Duration: {course['duration']}",
        f"Price: ${course['price']}",
        "",
        "=== COURSE DESCRIPTION ===",
        course['description'],
        "",
        "=== WHAT YOU WILL LEARN IN THIS COURSE ===",
    ]
    
    for i, item in enumerate(course['whatYouLearn'], 1):
        content_parts.append(f"{i}. {item}")
    
    content_parts.extend([
        "",
        "=== COURSE REQUIREMENTS ===",
    ])
    
    for i, item in enumerate(course['requirements'], 1):
        content_parts.append(f"{i}. {item}")
    
    content_parts.extend([
        "",
        "=== COURSE LESSONS AND VIDEOS ===",
        f"This course contains {len(course['lessons'])} video lessons:",
        ""
    ])
    
    for i, lesson in enumerate(course['lessons'], 1):
        content_parts.extend([
            f"Lesson {i}: {lesson['title']}",
            f"Duration: {lesson['duration']}",
            f"Content: {lesson['description']}",
            ""
        ])
    
    if 'tags' in course:
        content_parts.extend([
            "=== COURSE TAGS ===",
            ", ".join(course['tags'])
        ])
    
    return "\n".join(content_parts)

def index_course(course):
    """Index a single course - send only the required fields"""
    content = build_course_content(course)
    
    # Only send fields that match CourseDocument model
    data = {
        "course_id": course["id"],
        "title": course["title"],
        "description": course["description"],
        "content": content,  # All detailed info goes here as a string
        "instructor": course["instructor"],
        "category": course["category"],
        "level": course["level"]
    }
    
    try:
        print(f"    Sending data: course_id={data['course_id']}, title={data['title']}")
        
        response = requests.post(
            f"{API_URL}/index-course",
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return {"success": True, "course": course}
        else:
            error_detail = response.text
            print(f"    Response status: {response.status_code}")
            print(f"    Response body: {error_detail}")
            return {"success": False, "course": course, "error": error_detail}
    except Exception as e:
        return {"success": False, "course": course, "error": str(e)}

def main():
    print("=" * 70)
    print("🚀 COURSE INDEXING SYSTEM")
    print("=" * 70)
    
    # Test connection
    print("\n📡 Testing backend connection...")
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running!")
            health_data = response.json()
            print(f"   Status: {health_data}\n")
        else:
            print(f"❌ Backend returned status: {response.status_code}")
            return
    except Exception as e:
        print(f"❌ Cannot connect to backend: {str(e)}")
        print("\nMake sure backend is running:")
        print("  cd e_learning_AI")
        print("  uvicorn app.main:app --reload --port 8000")
        return
    
    print(f"📚 Starting to index {len(COURSES)} course(s)...\n")
    
    success_count = 0
    fail_count = 0
    results = []
    
    for i, course in enumerate(COURSES, 1):
        print(f"[{i}/{len(COURSES)}] Indexing: {course['title']}")
        print(f"    Course ID: {course['id']}")
        print(f"    Instructor: {course['instructor']}")
        print(f"    Lessons: {len(course['lessons'])}")
        
        result = index_course(course)
        results.append(result)
        
        if result['success']:
            print(f"    ✅ Successfully indexed\n")
            success_count += 1
        else:
            print(f"    ❌ Failed: {result['error']}\n")
            fail_count += 1
        
        # Delay between requests
        if i < len(COURSES):
            time.sleep(1)
    
    print("=" * 70)
    print("📊 INDEXING SUMMARY")
    print("=" * 70)
    print(f"✅ Successfully indexed: {success_count}")
    print(f"❌ Failed: {fail_count}")
    print(f"📚 Total courses: {len(COURSES)}")
    
    if success_count > 0:
        print("\n✨ Successfully indexed courses:")
        for result in results:
            if result['success']:
                print(f"   • {result['course']['title']} (ID: {result['course']['id']})")
        
        print("\n🎉 You can now ask questions about these courses!")
        print("\nExample questions to try:")
        print("  • What is the name of this course?")
        print("  • What will I learn in this course?")
        print("  • How many lessons are there?")
        print("  • Tell me about the first lesson")
        print("  • What are the requirements?")
        print("  • Who is the instructor?")
    
    print("=" * 70)

if __name__ == "__main__":
    main()
