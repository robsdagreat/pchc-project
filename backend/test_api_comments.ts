async function testFetch() {
  try {
    const API_URL = 'http://localhost:5001/api';
    // 1. Get all blogs to find one with comments
    const blogId = 3;
    
    // 2. Fetch detailed blog
    const detailRes = await fetch(`${API_URL}/blogs/${blogId}`);
    const detail: any = await detailRes.json();
    console.log('Blog Detail Comments:', JSON.stringify(detail.data.comments, null, 2));
    process.exit(0);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Fetch failed:', message);
    process.exit(1);
  }
}

testFetch();
