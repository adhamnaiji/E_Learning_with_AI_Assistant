import requests

API_URL = "http://localhost:8000/api"

# Test all course IDs from your indexing script
COURSE_IDS = [1, 2, 3, 4, 5, 6]

def test_course(course_id):
    """Test if a specific course can be queried"""
    print(f"\n{'='*60}")
    print(f"Testing Course ID: {course_id}")
    print('='*60)
    
    try:
        response = requests.post(
            f"{API_URL}/chat",
            json={
                "message": "What is the name of this course?",
                "course_id": course_id
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Response received")
            print(f"📝 Answer: {result['response'][:200]}...")
            print(f"📚 Sources: {len(result['sources'])}")
            
            if result['sources']:
                for source in result['sources']:
                    print(f"   - {source['title']}")
                return True
            else:
                print(f"⚠️  No sources found - course may not be properly indexed")
                return False
        else:
            print(f"❌ Failed with status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🧪 TESTING ALL COURSES")
    print("=" * 60)
    
    results = {}
    for course_id in COURSE_IDS:
        results[course_id] = test_course(course_id)
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    
    working = [cid for cid, works in results.items() if works]
    not_working = [cid for cid, works in results.items() if not works]
    
    print(f"\n✅ Working courses ({len(working)}): {working}")
    print(f"❌ Not working courses ({len(not_working)}): {not_working}")
    
    if not_working:
        print(f"\n⚠️  Courses {not_working} need to be re-indexed")
        print("Run: python scripts/index_all_courses.py")
    else:
        print("\n🎉 All courses are working!")
