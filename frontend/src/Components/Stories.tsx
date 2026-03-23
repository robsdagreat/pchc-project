import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils/api';

const Stories = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await fetchData('/blogs');
        const blogsArray = response.data.blogs;
        
        const formattedStories = blogsArray.slice(0, 5).map((blog: any) => ({
          id: blog.id,
          type: blog.media_type || 'image',
          mediaUrl: blog.media_url || 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
          category: blog.category,
          title: blog.title,
          description: blog.content,
          author: blog.author ? `by ${blog.author}` : 'by PCHC Team'
        }));
        
        console.log('Formatted Stories:', formattedStories);
        setStories(formattedStories);
      } catch (err) {
        console.error('Failed to load stories:', err);
        setError('Failed to load stories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || stories.length === 0) {
    return null; // Don't show the section if it fails or is empty
  }

  const featuredStory = stories[0];
  const recentStories = stories.slice(1);

  return (
    <section className="w-full bg-slate-100 py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
            Stories <span className="text-green-500">Of Impact</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
 
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Column: Featured Story */}
          <Link to={`/blogs?id=${featuredStory.id}`} className="w-full lg:w-2/3 block group cursor-pointer lg:pr-16 xl:pr-24 mb-6 lg:mb-0">
            <div className="relative overflow-hidden rounded-2xl mb-4 lg:mb-6 aspect-video lg:aspect-[21/9] max-h-[300px] sm:max-h-[350px] bg-gray-100">
              <img 
                src={featuredStory.mediaUrl} 
                alt={featuredStory.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
                }}
              />
              {featuredStory.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-green-500 fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-outfit">
                {featuredStory.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-green-500 transition-colors">
                {featuredStory.title}
              </h3>
              <p className="font-outfit font-light text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2">
                {featuredStory.description}
              </p>
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-200">
                <p className="text-[10px] font-medium text-gray-400 font-outfit uppercase tracking-wider">
                  {featuredStory.author}
                </p>
                <span className="text-green-500 font-bold text-xs group-hover:underline decoration-2 underline-offset-4 transition-all uppercase">
                  READ MORE →
                </span>
              </div>
            </div>
          </Link>
          {/* Right Column: Recent Stories List */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6 lg:space-y-4 pt-6 mt-2 lg:pt-0 lg:mt-0 border-t border-gray-200 lg:border-none">
            {recentStories.map((story, index) => (
              <div key={story.id} className="flex flex-col space-y-4">
                <Link to={`/blogs?id=${story.id}`} className="flex gap-4 sm:gap-6 lg:gap-4 group cursor-pointer items-center">
                  <div className="relative flex-shrink-0 w-28 h-20 sm:w-36 sm:h-24 md:w-40 md:h-28 lg:w-24 lg:h-16 xl:w-28 xl:h-20 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                    <img 
                      src={story.mediaUrl} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    {story.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-2 h-2 text-green-500 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center space-y-1 sm:space-y-1.5 lg:space-y-0.5 xl:space-y-1">
                    <span className="text-[10px] sm:text-[11px] lg:text-[8px] xl:text-[9px] font-bold text-gray-400 uppercase tracking-widest font-outfit">
                      {story.category}
                    </span>
                    <h4 className="text-sm sm:text-base lg:text-xs xl:text-sm font-bold text-gray-900 leading-tight group-hover:text-green-500 transition-colors line-clamp-2 uppercase">
                      {story.title}
                    </h4>
                    <span className="text-green-500 font-bold text-[10px] sm:text-[11px] lg:text-[8px] xl:text-[9px] tracking-widest mt-0.5 sm:mt-1 group-hover:underline uppercase">
                      READ MORE →
                    </span>
                  </div>
                </Link>

                {/* Show 'See All Stories' button after the last item in the list */}
                {index === recentStories.length - 1 && (
                  <div className="pt-4 flex w-full justify-center lg:justify-start">
                    <Link
                      to="/blogs"
                      className="w-full sm:w-auto text-center border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 min-w-[200px] px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm text-xs md:text-sm uppercase tracking-widest"
                    >
                      See All Stories
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stories;
