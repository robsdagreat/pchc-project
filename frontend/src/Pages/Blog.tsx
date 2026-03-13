import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Heart, MessageCircle } from 'lucide-react';
import StoryFeatured from '../assets/story_featured.png';
import StoryLearning from '../assets/story_learning.png';
import StoryMusic from '../assets/story_music.png';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');

  const blogs = [
    {
      id: 1,
      type: 'image',
      mediaUrl: StoryFeatured,
      category: 'Education & Art',
      title: 'How painting changed David\'s world',
      description: 'David, who uses a wheelchair, found his voice through our inclusive art therapy program. What started as small brushstrokes has become a canvas of confidence and self-expression.',
      author: 'BY SARAH JOHNSON'
    },
    {
      id: 2,
      type: 'video',
      mediaUrl: StoryLearning,
      category: 'Cognitive Development',
      title: '5 ways inclusive learning helps children thrive',
      description: 'Discover the cognitive benefits of inclusive environments where children of all abilities learn side-by-side, fostering empathy and accelerated developmental milestones.',
      author: 'BY MICHAEL CHEN'
    },
    {
      id: 3,
      type: 'image',
      mediaUrl: StoryMusic,
      category: 'Therapy & Growth',
      title: 'The rhythm of hope: Maria\'s music journey',
      description: 'Music therapy has unlocked new avenues of communication for Maria. Follow her inspiring journey as she connects with the world through the power of rhythm and melody.',
      author: 'BY DR. EMILY WHITE'
    },
    {
      id: 4,
      type: 'video',
      mediaUrl: StoryFeatured,
      category: 'Community Support',
      title: 'Building a playground for all abilities',
      description: 'See how our community came together to construct a fully accessible playground, ensuring every child has the opportunity to play, explore, and simply be a kid.',
      author: 'BY JAMES WILSON'
    },
    {
      id: 5,
      type: 'image',
      mediaUrl: StoryLearning,
      category: 'Health & Care',
      title: 'Mental health support for diverse needs',
      description: 'A deep dive into our tailored mental health programs designed specifically to support the unique emotional landscapes of children with intellectual disabilities.',
      author: 'BY DR. KEVIN ADAMS'
    }
  ];

  const initialBlog = blogs.find(b => b.id.toString() === urlId) || blogs[0];

  const [selectedBlog, setSelectedBlog] = useState(initialBlog);
  const [isReading, setIsReading] = useState(!!urlId); // Auto-open if navigating directly via ID
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Effect to update selected blog if URL changes while on the page
  useEffect(() => {
    if (urlId) {
      const foundBlog = blogs.find(b => b.id.toString() === urlId);
      if (foundBlog) {
        setSelectedBlog(foundBlog);
        setIsReading(true);
      }
    }
  }, [urlId]);
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'Mary J.', text: 'This is such a touching story! Thank you for sharing.' },
    { id: 2, user: 'David Smith', text: 'Incredible work being done here. Keep it up!' }
  ]);

  const handleReadMore = () => {
    setIsReading(true);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() !== '') {
      setCommentsList([...commentsList, { id: Date.now(), user: 'Guest User', text: commentText }]);
      setCommentText('');
    }
  };

  // Reset reading state when a different blog is selected
  const handleSelectBlog = (blog: any) => {
    setSelectedBlog(blog);
    setIsReading(false);
    setIsLiked(false);
    // In a real app, likes and comments would be fetched per blog
  };
  
  return (
    <div className="w-full bg-[#FCF8F2] pt-32 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        {/* Left Area: Selected Blog Reading Space */}
        <div className="lg:w-3/5 xl:w-2/3 flex flex-col animate-fade-in pr-2 md:pr-4">
          <div className="relative overflow-hidden mb-4 rounded-[2rem] shadow-lg w-full flex-shrink-0">
            <img 
              src={selectedBlog.mediaUrl} 
              alt={selectedBlog.title}
              className="w-full h-auto max-h-[40vh] object-cover"
            />
            {selectedBlog.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-green-500 fill-current ml-1.5 md:ml-2" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <span className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-[0.15em] font-sans">
              {selectedBlog.category}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-[40px] font-bold text-[#0F172A] leading-tight mb-1">
              {selectedBlog.title}
            </h1>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light mb-2">
              {selectedBlog.description}
            </p>

            {isReading && (
              <div className="text-gray-600 text-base leading-relaxed space-y-4 animate-fade-in border-t border-gray-200 pt-6 mt-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                </p>

                {/* Interaction Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-6 mb-8">
                    <button 
                      onClick={handleLike}
                      className={`flex items-center gap-2 font-bold transition-colors ${isLiked ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{likes} Likes</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                      <MessageCircle className="w-6 h-6" />
                      <span>{commentsList.length} Comments</span>
                    </div>
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Leave a Comment</h3>
                    <div className="flex flex-col gap-3">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24 bg-white"
                        required
                      ></textarea>
                      <button 
                        type="submit"
                        className="self-end bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {commentsList.map(comment => (
                      <div key={comment.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <span className="font-bold text-sm text-gray-900 block mb-1">{comment.user}</span>
                        <p className="text-gray-600 text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setIsReading(false)}
                    className="mt-8 text-gray-500 font-bold text-sm tracking-wide hover:text-green-500 transition-colors uppercase"
                  >
                    &larr; Collapse Article
                  </button>
                </div>
              </div>
            )}
            
            {!isReading && (
              <div className="flex items-center justify-between pt-4 pb-2 border-t border-gray-200 mt-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {selectedBlog.author}
                </span>
                <button 
                  onClick={handleReadMore}
                  className="text-green-500 font-bold text-sm tracking-wide hover:underline decoration-2 underline-offset-4 cursor-pointer focus:outline-none"
                >
                  READ MORE &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Blog List */}
        <div className="lg:w-2/5 xl:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col space-y-6">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className={`flex gap-5 group cursor-pointer p-2 rounded-xl transition-all ${selectedBlog.id === blog.id ? 'bg-white shadow-sm ring-1 ring-gray-100' : 'hover:bg-white/50'}`}
                onClick={() => handleSelectBlog(blog)}
              >
                <div className="relative flex-shrink-0 w-32 h-20 overflow-hidden rounded-xl bg-gray-200 shadow-sm">
                  <img 
                    src={blog.mediaUrl} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {blog.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                        <Play className="w-3 h-3 text-green-500 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center gap-1.5 w-full">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    {blog.category}
                  </span>
                  <h4 className={`text-sm font-bold leading-tight line-clamp-2 uppercase ${selectedBlog.id === blog.id ? 'text-green-600' : 'text-[#0F172A] group-hover:text-green-500 transition-colors'}`}>
                    {blog.title}
                  </h4>
                  <span className="text-green-500 font-bold text-[10px] tracking-wide mt-1">
                    READ MORE &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Blog;
