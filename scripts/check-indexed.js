const API_URL = 'http://localhost:8000/api';

async function testSearch() {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: "Angular course",
        top_k: 5
      })
    });
    
    const results = await response.json();
    console.log('Search Results:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSearch();
