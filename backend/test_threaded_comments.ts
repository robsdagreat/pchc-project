import 'dotenv/config';
import db from './src/config/db.js';

async function testReply() {
  try {
    // 1. Find a blog
    const blogRes = await db.query("SELECT id FROM blogs LIMIT 1");
    if (blogRes.rows.length === 0) throw new Error("No blogs found");
    const blogId = blogRes.rows[0].id;
    
    // 2. Add a parent comment
    const pRes = await db.query(
      "INSERT INTO comments (blog_id, name, comment) VALUES ($1, $2, $3) RETURNING id",
      [blogId, 'Parent User', 'This is a parent comment']
    );
    const parentId = pRes.rows[0].id;
    console.log('Added parent comment:', parentId);
    
    // 3. Add a reply
    const rRes = await db.query(
      "INSERT INTO comments (blog_id, name, comment, parent_id) VALUES ($1, $2, $3, $4) RETURNING id",
      [blogId, 'Reply User', 'This is a reply to parent', parentId]
    );
    console.log('Added reply comment:', rRes.rows[0].id);
    
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

testReply();
