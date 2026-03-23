import 'dotenv/config';
import db from './src/config/db.js';

const blogData = [
  {
    title: "Healing Through Expression: Our Art Therapy Journey",
    content: "Art therapy has emerged as a cornerstone of our community programs, providing a safe and creative outlet for individuals of all abilities. Over the past six months, we've witnessed remarkable transformations as participants find their voice through color and form. These sessions aren't just about making art—they're about building confidence, fostering emotional resilience, and creating a sense of belonging in an inclusive environment.",
    author: "Sarah Johnson",
    category: "Creative Arts"
  },
  {
    title: "Breaking Barriers: Healthcare for Rural Communities",
    content: "Our most recent medical outreach program successfully reached over 500 families across the remote regions of the valley. By bringing essential screenings, vaccinations, and health education directly to those who need it most, we're slowly but surely closing the gap in healthcare access. The gratitude of the community members serves as a powerful reminder of how vital these services are for families who previously had to travel for hours to reach the nearest clinic.",
    author: "Dr. Robert Chen",
    category: "Healthcare"
  },
  {
    title: "Digital Literacy: Empowering the Next Generation",
    content: "In today's interconnected world, digital skills are more than just an advantage—they're a necessity. Our new Vocational Training Center is now fully operational, equipping young adults with essential computer literacy and job-ready skills. From basic software proficiency to advanced technical training, we're paving the way for a generation that can confidently navigate and contribute to the modern economy, regardless of their background.",
    author: "Michael Okoro",
    category: "Education"
  },
  {
    title: "Sustainability in Action: Our Community Garden Project",
    content: "Our 'Green Roots' initiative has officially blossomed into a thriving community garden, providing fresh produce for over 50 local families. Beyond the harvest, the garden has become a living classroom where we teach sustainable farming practices and environmental stewardship. It's a space where neighbors connect, children learn where their food comes from, and everyone works together to build a more resilient and self-sufficient community.",
    author: "Elena Rodriguez",
    category: "General"
  }
];

async function populateBlogs() {
  try {
    // Get all blog IDs
    const { rows: blogs } = await db.query('SELECT id FROM blogs ORDER BY id ASC');
    
    for (let i = 0; i < blogs.length; i++) {
        const data = blogData[i % blogData.length];
        await db.query(
            'UPDATE blogs SET title = $1, content = $2, author = $3, category = $4 WHERE id = $5',
            [data.title, data.content, data.author, data.category, blogs[i].id]
        );
        console.log(`Updated blog ID ${blogs[i].id}: ${data.title}`);
    }

    console.log('Successfully updated all blogs with unique content.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating blogs:', err);
    process.exit(1);
  }
}

populateBlogs();
