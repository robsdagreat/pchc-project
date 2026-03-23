import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Heart, MessageCircle } from 'lucide-react';
import { fetchData } from '../utils/api';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isReading, setIsReading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Load liked status from localStorage on component mount or when selectedBlog changes
  useEffect(() => {
    if (selectedBlog?.id) {
       const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
       setIsLiked(likedBlogs.includes(selectedBlog.id));
    }
  }, [selectedBlog?.id]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetchData('/blogs');
        const blogsArray = response.data.blogs;
        const formattedBlogs = blogsArray.map((b: any) => ({
          ...b,
          mediaUrl: b.media_url,
          type: b.media_type,
          author: b.author ? `BY ${b.author.toUpperCase()}` : 'BY PCHC TEAM'
        }));
        setBlogs(formattedBlogs);
        
        const initial = urlId 
          ? formattedBlogs.find((b: any) => b.id.toString() === urlId)
          : formattedBlogs[0];
          
        if (initial) {
          setSelectedBlog(initial);
          setLikes(initial.likes || 0);
          if (urlId) setIsReading(true);
        }
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [urlId]);

  // Effect to load detailed blog data when selected (including comments)
  useEffect(() => {
    if (selectedBlog?.id) {
       const fetchDetails = async () => {
          try {
             const response = await fetchData(`/blogs/${selectedBlog.id}`);
             if (response.data.blog) {
                const b = response.data.blog;
                // Update selected blog with latest data (likes etc) without resetting scroll
                setLikes(b.likes || 0);
             }
             if (response.data.comments) {
                setCommentsList(response.data.comments);
             }
          } catch (err) {
             console.error('Failed to load blog details:', err);
          }
       };
       fetchDetails();
    }
  }, [selectedBlog?.id]);

  const handleSelectBlog = (blog: any) => {
    setSelectedBlog(blog);
    setLikes(blog.likes || 0);
    setIsReading(false);
    setIsLiked(false);
    setCommentsList([]); 
    // Update URL without full page reload
    const newUrl = `${window.location.pathname}?id=${blog.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Check if liked
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    setIsLiked(likedBlogs.includes(blog.id));
  };

  const handleReadMore = () => {
    setIsReading(true);
    // Details are now fetched by the useEffect above
  };

  const handleLike = async () => {
    if (isLiked || !selectedBlog) return; // Prevent multiple likes or liking nothing

    try {
      const response = await fetchData(`/blogs/${selectedBlog.id}/like`, { 
        method: 'POST' 
      });
      
      if (response.status === 'success') {
        setLikes(response.data.likes);
        setIsLiked(true);
        
        // Save to localStorage
        const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
        if (!likedBlogs.includes(selectedBlog.id)) {
          likedBlogs.push(selectedBlog.id);
          localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
        }
      }
    } catch (err) {
      console.error('Failed to persist like:', err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() !== '' && commentName.trim() !== '' && selectedBlog) {
      setIsSubmittingComment(true);
      try {
        const response = await fetchData(`/blogs/${selectedBlog.id}/comments`, {
          method: 'POST',
          body: JSON.stringify({
            name: commentName,
            comment: commentText
          })
        });
        if (response.status === 'success') {
          setCommentsList([response.data.comment, ...commentsList]);
          setCommentText('');
          setCommentName('');
        }
      } catch (err) {
        console.error('Failed to post comment:', err);
        alert('Failed to post comment. Please try again.');
      } finally {
        setIsSubmittingComment(false);
      }
    }
  };
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2] font-bold text-red-500">{error}</div>;
  if (!selectedBlog) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2]">No blog posts found.</div>;

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
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
              }}
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

            {isReading ? (
              <div className="text-gray-600 text-base leading-relaxed space-y-4 animate-fade-in border-t border-gray-200 pt-6 mt-4">
                {selectedBlog.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
                
                <button 
                  onClick={() => setIsReading(false)}
                  className="mt-4 text-gray-500 font-bold text-sm tracking-wide hover:text-green-500 transition-colors uppercase"
                >
                  &larr; Collapse Article
                </button>
              </div>
            ) : (
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

            {/* Interaction & Comments Section - Always Visible for Selected Blog */}
            <div className="mt-12 pt-12 border-t border-gray-200">
               <div className="flex items-center gap-6 mb-10">
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
               <form id="comment-form" onSubmit={handleCommentSubmit} className="mb-12 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                     <MessageCircle className="w-5 h-5 text-green-500" />
                     Leave a Comment
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                          <input 
                            type="text"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            placeholder="e.g. Jane Doe"
                            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all font-medium"
                            required
                          />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                       <textarea 
                         value={commentText}
                         onChange={(e) => setCommentText(e.target.value)}
                         placeholder="Share your thoughts or encouragement..."
                         className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white resize-none h-32 transition-all font-medium leading-relaxed"
                         required
                       ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmittingComment}
                      className="self-end bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg shadow-green-100 active:scale-95 flex items-center gap-2"
                    >
                      {isSubmittingComment ? (
                         <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Posting...
                         </>
                      ) : 'Post Comment'}
                    </button>
                  </div>
               </form>

               {/* Comments List */}
               <div className="space-y-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                     Community Discussion ({commentsList.length})
                  </h4>
                  {(() => {
                    const rootComments = commentsList.filter(c => !c.parent_id);
                    const replies = commentsList.filter(c => c.parent_id);
                    
                    return rootComments.map(comment => (
                      <div key={comment.id} className="space-y-4">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm shrink-0">
                                  {comment.name ? comment.name[0].toUpperCase() : 'G'}
                              </div>
                              <div>
                                  <span className="font-bold text-sm text-gray-900 block">{comment.name || 'Anonymous'}</span>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                    {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : 'Just now'}
                                  </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed pl-1">{comment.comment}</p>
                        </div>

                        {/* Render Replies */}
                        <div className="ml-8 md:ml-12 space-y-4 border-l-2 border-green-100/50 pl-4 md:pl-6">
                          {replies.filter(r => r.parent_id === comment.id).map(reply => (
                            <div key={reply.id} className="bg-white/60 p-5 rounded-[1.5rem] shadow-sm border border-gray-100/50">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                                    {reply.name ? reply.name[0].toUpperCase() : 'G'}
                                </div>
                                <div>
                                    <span className="font-bold text-xs text-gray-800 block">{reply.name || 'Anonymous'}</span>
                                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                                      {reply.created_at ? new Date(reply.created_at).toLocaleDateString() : 'Just now'}
                                    </span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-xs leading-relaxed">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                  {commentsList.length === 0 && (
                     <div className="py-10 text-center bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium italic">No comments yet. Be the first to start the conversation!</p>
                     </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* Right Area: Blog List Sidebar */}
        <div className="lg:w-2/5 xl:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-col space-y-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2 px-2">Other Stories</h4>
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
                    }}
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
