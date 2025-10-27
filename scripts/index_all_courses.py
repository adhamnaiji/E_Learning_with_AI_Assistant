import requests
import json
import time

# ============================================================================
# COPY ALL YOUR COURSES FROM src/app/data/static-data.ts HERE
# ============================================================================

COURSES = [
    # Course 1 - Angular
    {
        "id": 1,
        "title": "Complete Angular Developer Course",
        "description": "Master Angular from scratch with hands-on projects and real-world applications.",
        "instructor": "John Smith",
        "category": "Web Development",
        "level": "Intermediate",
        "duration": "40 hours",
        "whatYouLearn": [
            "Build complete Angular applications from scratch",
            "Master Angular components, directives, and services",
            "Work with RxJS and reactive programming",
            "Implement routing and authentication",
            "Deploy Angular apps to production"
        ],
        "requirements": [
            "Basic HTML, CSS, and JavaScript knowledge",
            "Understanding of programming concepts",
            "A computer with internet connection"
        ],
        "lessons": [
            {"title": "Introduction to Angular", "duration": "15:30", "description": "Get started with Angular framework"},
            {"title": "Components and Templates", "duration": "25:45", "description": "Learn about Angular components"},
            {"title": "Services and Dependency Injection", "duration": "30:20", "description": "Understanding Angular services"}
        ]
    },
    
    # Course 2 - React
    {
        "id": 2,
        "title": "React JS Masterclass",
        "description": "Learn React JS with Redux, Hooks, and modern best practices.",
        "instructor": "Sarah Johnson",
        "category": "Web Development",
        "level": "Beginner",
        "duration": "35 hours",
        "whatYouLearn": [
            "Build modern React applications",
            "Master React Hooks and Context API",
            "State management with Redux",
            "Build reusable components"
        ],
        "requirements": [
            "JavaScript fundamentals",
            "Basic understanding of HTML and CSS"
        ],
        "lessons": [
            {"title": "React Fundamentals", "duration": "20:00", "description": "Introduction to React"},
            {"title": "React Hooks Deep Dive", "duration": "30:00", "description": "Master useState, useEffect, and custom hooks"}
        ]
    },
    
    # Course 3 - Python
    {
        "id": 3,
        "title": "Python for Data Science",
        "description": "Master Python programming for data analysis and visualization.",
        "instructor": "Michael Chen",
        "category": "Data Science",
        "level": "Beginner",
        "duration": "45 hours",
        "whatYouLearn": [
            "Python programming fundamentals",
            "Data analysis with Pandas and NumPy",
            "Data visualization with Matplotlib",
            "Machine learning basics with scikit-learn"
        ],
        "requirements": [
            "No prior programming experience needed",
            "Basic mathematics knowledge"
        ],
        "lessons": [
            {"title": "Python Basics", "duration": "30:00", "description": "Introduction to Python programming"},
            {"title": "Data Analysis with Pandas", "duration": "45:00", "description": "Learn data manipulation"}
        ]
    },
    
    # ADD MORE COURSES HERE FROM YOUR static-data.ts
    # Just copy-paste and convert TypeScript to Python format
]

API_URL = "http://localhost:8000/api"

def build_course_content(course):
    """Build rich, searchable content for each course"""
    content_parts = [
        "=== COURSE INFORMATION ===",
        f"Course ID: {course['id']}",
        f"Course Title: {course['title']}",
        f"Instructor: {course['instructor']}",
        f"Category: {course['category']}",
        f"Level: {course['level']}",
        f"Duration: {course.get('duration', 'N/A')}",
        "",
        "=== DESCRIPTION ===",
        course['description'],
        "",
        "=== WHAT YOU WILL LEARN ===",
    ]
    
    for i, item in enumerate(course.get('whatYouLearn', []), 1):
        content_parts.append(f"{i}. {item}")
    
    content_parts.extend([
        "",
        "=== REQUIREMENTS ===",
    ])
    
    for i, item in enumerate(course.get('requirements', []), 1):
        content_parts.append(f"{i}. {item}")
    
    content_parts.extend([
        "",
        "=== COURSE CONTENT - VIDEO LESSONS ===",
        f"This course contains {len(course.get('lessons', []))} video lessons:",
        ""
    ])
    
    for i, lesson in enumerate(course.get('lessons', []), 1):
        content_parts.extend([
            f"Lesson {i}: {lesson['title']}",
            f"Duration: {lesson['duration']}",
            f"Description: {lesson['description']}",
            ""
        ])
    
    return "\n".join(content_parts)

def index_course(course):
    """Index a single course to the RAG system"""
    content = build_course_content(course)
    
    data = {
        "course_id": course["id"],
        "title": course["title"],
        "description": course["description"],
        "content": content,
        "instructor": course["instructor"],
        "category": course["category"],
        "level": course["level"]
    }
    
    try:
        response = requests.post(
            f"{API_URL}/index-course",
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            return {"success": True, "course": course}
        else:
            return {"success": False, "course": course, "error": response.text}
    except Exception as e:
        return {"success": False, "course": course, "error": str(e)}

def main():
    print("=" * 80)
    print(" " * 20 + "🎓 E-LEARNING COURSE INDEXING SYSTEM 🎓")
    print("=" * 80)
    
    # Test backend connection
    print("\n📡 Testing backend connection...")
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running and healthy!\n")
        else:
            print(f"❌ Backend returned unexpected status: {response.status_code}")
            return
    except Exception as e:
        print(f"❌ Cannot connect to backend: {str(e)}")
        print("\n🔧 Make sure backend is running:")
        print("   cd e_learning_AI")
        print("   uvicorn app.main:app --reload --port 8000")
        return
    
    print(f"📚 Preparing to index {len(COURSES)} courses...\n")
    print("=" * 80)
    
    success_count = 0
    fail_count = 0
    results = []
    
    start_time = time.time()
    
    for i, course in enumerate(COURSES, 1):
        print(f"\n[{i}/{len(COURSES)}] Processing: {course['title']}")
        print(f"    📋 ID: {course['id']}")
        print(f"    👨‍🏫 Instructor: {course['instructor']}")
        print(f"    📂 Category: {course['category']}")
        print(f"    📊 Level: {course['level']}")
        print(f"    🎥 Lessons: {len(course.get('lessons', []))}")
        print(f"    ⏱️  Indexing...", end=" ")
        
        result = index_course(course)
        results.append(result)
        
        if result['success']:
            print("✅ SUCCESS")
            success_count += 1
        else:
            print(f"❌ FAILED")
            print(f"       Error: {result['error']}")
            fail_count += 1
        
        # Small delay between requests to not overwhelm the backend
        if i < len(COURSES):
            time.sleep(0.5)
    
    elapsed_time = time.time() - start_time
    
    # Summary
    print("\n" + "=" * 80)
    print(" " * 30 + "📊 INDEXING SUMMARY")
    print("=" * 80)
    print(f"\n✅ Successfully indexed: {success_count}/{len(COURSES)} courses")
    print(f"❌ Failed: {fail_count}/{len(COURSES)} courses")
    print(f"⏱️  Total time: {elapsed_time:.2f} seconds")
    
    if success_count > 0:
        print("\n" + "=" * 80)
        print("✨ SUCCESSFULLY INDEXED COURSES:")
        print("=" * 80)
        
        # Group by category
        categories = {}
        for result in results:
            if result['success']:
                cat = result['course']['category']
                if cat not in categories:
                    categories[cat] = []
                categories[cat].append(result['course'])
        
        for category, courses in categories.items():
            print(f"\n📂 {category}:")
            for course in courses:
                print(f"   • {course['title']} (ID: {course['id']})")
        
        print("\n" + "=" * 80)
        print("🎉 READY TO USE!")
        print("=" * 80)
        print("\n💬 Your AI chat assistant can now answer questions about:")
        print(f"   • {success_count} different courses")
        print(f"   • {sum(len(r['course'].get('lessons', [])) for r in results if r['success'])} total lessons")
        print("\n🚀 Go to your Angular app and try asking:")
        print("   - 'What is this course about?'")
        print("   - 'What will I learn?'")
        print("   - 'Tell me about the lessons'")
        print("   - 'What are the requirements?'")
        print("   - 'Who is the instructor?'")
    
    if fail_count > 0:
        print("\n" + "=" * 80)
        print("⚠️  FAILED COURSES:")
        print("=" * 80)
        for result in results:
            if not result['success']:
                print(f"\n❌ {result['course']['title']} (ID: {result['course']['id']})")
                print(f"   Error: {result['error']}")
    
    print("\n" + "=" * 80)

if __name__ == "__main__":
    main()
