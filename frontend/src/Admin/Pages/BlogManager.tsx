import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MessageSquare, 
  Image as ImageIcon, 
  Loader2,
  X,
  Check,
  AlertCircle,
  Send,
  Clock,
  Tag,
  Upload,
  Video as VideoIcon,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { fetchData } from '../../utils/api';

interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
  created_at: string;
  likes: number;
  media_url: string;
  media_type: string;
  content: string;
}

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [selectedBlogForComments, setSelectedBlogForComments] = useState<Blog | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetchData('/blogs');
      setBlogs(response.data.blogs || []);
    } catch (err) {
      console.error('Failed to load blogs:', err);
      setMessage({ type: 'error', text: 'Failed to load stories.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await fetchData(`/blogs/${id}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Story deleted successfully.' });
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete story.' });
    }
  };

  const handleSave = async (formData: any, file: File | null) => {
    const isEdit = !!selectedBlog;
    const url = isEdit ? `/blogs/${selectedBlog.id}` : '/blogs';
    const method = isEdit ? 'PUT' : 'POST';
    
    try {
      setLoading(true);
      let mediaUrl = formData.media_url;

      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const API_URL = import.meta.env.VITE_API_URL || 'https://pchc-project.onrender.com/api';
        const token = localStorage.getItem('adminToken');
        
        const uploadRes = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: uploadData
        });

        if (!uploadRes.ok) throw new Error('Media upload failed');
        const uploadJson = await uploadRes.json();
        mediaUrl = uploadJson.data.url;
      }

      await fetchData(url, {
        method,
        body: JSON.stringify({
           ...formData,
           media_url: mediaUrl,
           media_type: file ? (file.type.startsWith('video/') ? 'video' : 'image') : formData.media_type
        })
      });

      setMessage({ type: 'success', text: `Story ${isEdit ? 'updated' : 'created'} successfully.` });
      setIsFormOpen(false);
      setSelectedBlog(null);
      loadBlogs();
    } catch (err: any) {
      console.error('Save failed:', err);
      setMessage({ type: 'error', text: err.message || `Failed to ${isEdit ? 'update' : 'create'} story.` });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#1E4D3B] w-10 h-10" />
      </div>
    );
  }

  const filteredBlogs = blogs.filter(b => 
    (selectedCategory === 'All' || b.category === selectedCategory) &&
    (b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     b.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-outfit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-1">Blog Manager</h1>
          <p className="text-gray-400 font-medium text-sm tracking-wide uppercase opacity-70">Create and manage your website stories and blog posts.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <div className={`flex items-center gap-2 px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest border transition-all animate-in zoom-in-95 duration-300 ${
              message.type === 'success' ? 'bg-green-50 text-[#1E4D3B] border-green-100 shadow-lg shadow-green-900/5' : 'bg-red-50 text-red-600 border-red-100 shadow-lg shadow-red-900/5'
            }`}>
              {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {message.text}
            </div>
          )}
          <button 
            onClick={() => { setSelectedBlog(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-[#1E4D3B] hover:bg-[#143629] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-green-900/10 active:scale-95"
          >
            <Plus size={20} className="stroke-[3]" />
            Post New Story
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm shadow-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
           <div className="relative w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1E4D3B] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search stories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/10 focus:bg-white transition-all duration-300"
              />
           </div>
           <div className="flex gap-2">
              <div className="relative">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-400 focus:text-[#1E4D3B] outline-none hover:bg-white hover:shadow-md transition-all appearance-none cursor-pointer"
                >
                  <option>All</option>
                  <option>General</option>
                  <option>Creative Arts</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Success Stories</option>
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300" />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Story</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell">Details</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:table-cell">Engagement</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-gray-50/50 transition-colors">
                   <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.25rem] bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                         <img 
                          src={blog.media_url} 
                          alt="blog" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => (e.target as any).src = 'https://via.placeholder.com/150'}
                         />
                      </div>
                      <div className="max-w-xs md:max-w-sm">
                         <h4 className="font-black text-slate-900 text-[15px] tracking-tight mb-1 group-hover:text-[#1E4D3B] transition-all duration-300">{blog.title}</h4>
                         <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
                            <span className="flex items-center gap-1.5 transition-colors group-hover:text-slate-500"><Tag size={12} className="text-[#1E4D3B] opacity-70" /> {blog.category}</span>
                            <span className="flex items-center gap-1.5 transition-colors group-hover:text-slate-500"><Clock size={12} /> {new Date(blog.created_at).toLocaleDateString()}</span>
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden md:table-cell">
                    <div className="space-y-1">
                       <span className="flex items-center gap-2 text-xs text-gray-600 font-bold uppercase tracking-wider opacity-80">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-[#1E4D3B]/10 group-hover:text-[#1E4D3B] transition-colors">
                            {blog.author[0]}
                          </div>
                          {blog.author}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden lg:table-cell">
                    <div className="flex items-center gap-2 bg-slate-50 text-slate-400 px-4 py-2 rounded-xl w-fit border border-slate-100 group-hover:bg-[#1E4D3B]/5 group-hover:text-[#1E4D3B] group-hover:border-[#1E4D3B]/10 transition-all duration-500">
                       <MessageCircle size={15} className="opacity-70 group-hover:opacity-100" />
                       <span className="text-[10px] font-black uppercase tracking-widest">{blog.likes} Engage</span>
                    </div>
                  </td>
                    <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-1 px-1">
                       <button 
                        onClick={() => { setSelectedBlogForComments(blog); setIsCommentsOpen(true); }}
                        className="p-3 text-slate-300 hover:text-orange-500 hover:bg-orange-50/80 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                        title="Moderate Comments"
                       >
                          <MessageSquare size={19} className="stroke-[2.5]" />
                       </button>
                       <a 
                        href={`/blogs?id=${blog.id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 text-slate-300 hover:text-blue-500 hover:bg-blue-50/80 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                        title="View Live"
                       >
                          <ExternalLink size={19} className="stroke-[2.5]" />
                       </a>
                       <button 
                        onClick={() => { setSelectedBlog(blog); setIsFormOpen(true); }}
                        className="p-3 text-slate-300 hover:text-[#1E4D3B] hover:bg-[#1E4D3B]/5 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                        title="Edit Story"
                       >
                          <Edit2 size={19} className="stroke-[2.5]" />
                       </button>
                       <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50/80 rounded-2xl transition-all duration-300 active:scale-95 hover:shadow-sm"
                        title="Delete Story"
                       >
                          <Trash2 size={19} className="stroke-[2.5]" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBlogs.length === 0 && (
            <div className="p-20 text-center">
               <p className="text-gray-400 font-semibold text-lg">No stories matching your search. Try something else!</p>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <BlogForm 
          blog={selectedBlog} 
          onSave={handleSave} 
          onClose={() => { setIsFormOpen(false); setSelectedBlog(null); }} 
        />
      )}
      {isCommentsOpen && selectedBlogForComments && (
        <CommentModerator 
          blog={selectedBlogForComments} 
          onClose={() => { setIsCommentsOpen(false); setSelectedBlogForComments(null); }} 
        />
      )}
    </div>
  );
};

const BlogForm = ({ blog, onSave, onClose }: { blog: any, onSave: any, onClose: any }) => {
  const [formData, setFormData] = useState(blog || {
    title: '',
    author: '',
    category: 'General',
    media_url: '',
    content: '',
    media_type: 'image'
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(blog?.media_url || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setFormData({
        ...formData,
        media_type: selectedFile.type.startsWith('video/') ? 'video' : 'image'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    onSave(formData, file);
  };

  return (
     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500 font-outfit">
        <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all border border-gray-100 flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
           <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-[#1E4D3B]/5 rounded-2xl flex items-center justify-center text-[#1E4D3B]">
                    <Plus size={24} className="stroke-[3]" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{blog ? 'Edit Story' : 'New Story'}</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 opacity-70">Story Configuration</p>
                 </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-90 border border-transparent hover:border-gray-100">
                 <X size={24} className="text-gray-400" />
              </button>
           </div>
          
           <form onSubmit={handleSubmit} className="p-10 space-y-10 overflow-y-auto flex-grow no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Cover Media (Image or Video)</label>
                    <div className="relative group aspect-video rounded-[2rem] overflow-hidden border-2 border-dashed border-gray-100 bg-gray-50/50 hover:border-[#1E4D3B]/30 hover:bg-white transition-all duration-500 flex flex-col items-center justify-center text-center p-6 shadow-inner">
                       {previewUrl ? (
                          <>
                             {formData.media_type === 'video' ? (
                                <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop />
                             ) : (
                                <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                             )}
                             <div className="absolute inset-0 bg-[#1E4D3B]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl animate-in zoom-in-50 duration-300">
                                  <Upload size={28} className="stroke-[3]" />
                                </div>
                             </div>
                          </>
                       ) : (
                          <div className="space-y-4 animate-in fade-in duration-1000">
                             <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-gray-300 group-hover:text-[#1E4D3B] group-hover:shadow-lg transition-all duration-500">
                                <ImageIcon size={28} className="stroke-[1.5]" />
                             </div>
                             <div>
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Drag or click to upload</p>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-1">PNG, JPG, MP4 or WEBM</p>
                             </div>
                          </div>
                       )}
                       <input 
                         type="file" 
                         accept="image/*,video/*" 
                         onChange={handleFileChange} 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                       />
                    </div>
                    <div className="flex gap-3">
                       <div className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all duration-500 ${formData.media_type === 'image' ? 'border-[#1E4D3B] bg-[#1E4D3B] text-white shadow-lg shadow-green-900/10' : 'border-gray-50 bg-gray-50/50 text-gray-400 grayscale opacity-40'}`}>
                          <ImageIcon size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest font-outfit">Image</span>
                       </div>
                       <div className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all duration-500 ${formData.media_type === 'video' ? 'border-[#1E4D3B] bg-[#1E4D3B] text-white shadow-lg shadow-green-900/10' : 'border-gray-50 bg-gray-50/50 text-gray-400 grayscale opacity-40'}`}>
                          <VideoIcon size={18} />
                          <span className="text-[10px] font-black uppercase tracking-widest font-outfit">Video</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Story Title</label>
                       <input 
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-[1.25rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-black text-xl tracking-tight transition-all placeholder:text-gray-300"
                          placeholder="The Power of Art Therapy..."
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Author Name</label>
                          <input 
                             required
                             value={formData.author}
                             onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                             className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-bold text-sm tracking-wide transition-all placeholder:text-gray-300"
                             placeholder="John Doe"
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Category</label>
                          <div className="relative">
                            <select 
                               value={formData.category}
                               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                               className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-bold text-sm tracking-wide transition-all appearance-none cursor-pointer"
                            >
                               <option>General</option>
                               <option>Creative Arts</option>
                               <option>Healthcare</option>
                               <option>Education</option>
                               <option>Success Stories</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                               <Tag size={16} />
                            </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] ml-1 opacity-70">Story Content</label>
                 <textarea 
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-8 py-8 bg-gray-50 border border-transparent rounded-[2.5rem] focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 focus:bg-white outline-none font-medium text-[15px] leading-relaxed transition-all resize-none no-scrollbar placeholder:text-gray-300"
                    placeholder="Share your story here..."
                 />
              </div>

              <div className="pt-8 flex gap-5 sticky bottom-0 bg-white/80 backdrop-blur-md">
                 <button 
                   type="button" 
                   disabled={isUploading}
                   onClick={onClose} 
                   className="flex-1 py-5 bg-gray-50 hover:bg-gray-100 rounded-2xl font-black text-xs uppercase tracking-[.2em] text-gray-400 transition-all active:scale-95 disabled:opacity-50"
                 >
                   Discard Changes
                 </button>
                 <button 
                   type="submit" 
                   disabled={isUploading}
                   className="flex-2 py-5 bg-[#1E4D3B] hover:bg-[#143629] rounded-2xl font-black text-xs uppercase tracking-[.2em] text-white transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 px-12"
                 >
                   {isUploading ? <Loader2 size={18} className="animate-spin" /> : blog ? 'Update Story' : 'Publish Story'}
                 </button>
              </div>
           </form>
        </div>
     </div>
  );
};

const CommentModerator = ({ blog, onClose }: { blog: Blog, onClose: () => void }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    loadComments();
  }, [blog.id]);

  const loadComments = async () => {
    try {
      const response = await fetchData(`/blogs/${blog.id}`);
      setComments(response.data.comments || []);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Delete this comment permanently?')) return;
    try {
      await fetchData(`/blogs/comments/${commentId}`, { method: 'DELETE' });
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
      alert('Failed to delete comment.');
    }
  };

  const handleAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !replyingTo) return;

    setIsSubmittingReply(true);
    try {
      const response = await fetchData(`/blogs/${blog.id}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'PCHC Admin',
          comment: replyText,
          parent_id: replyingTo
        })
      });

      if (response.status === 'success') {
        setComments(prev => {
          const newComments = [...prev, response.data.comment];
          return newComments.sort((a, b) => a.id - b.id);
        });
        setReplyText('');
        setReplyingTo(null);
      }
    } catch (err) {
      console.error('Failed to post admin reply:', err);
      alert('Failed to post reply.');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500 font-outfit">
       <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col max-h-[88vh]">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1E4D3B]/5 rounded-2xl flex items-center justify-center text-[#1E4D3B]">
                   <MessageCircle size={24} className="stroke-[3]" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">Comment Moderation</h3>
                   <p className="text-[10px] font-black text-[#1E4D3B] uppercase tracking-[.2em] mt-0.5 opacity-70 truncate max-w-[300px]">{blog.title}</p>
                </div>
             </div>
             <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-90 border border-transparent hover:border-gray-100">
                <X size={24} className="text-gray-400" />
             </button>
          </div>

          <div className="flex-grow overflow-y-auto p-10 space-y-6 no-scrollbar">
             {loading ? (
                <div className="flex items-center justify-center py-24">
                   <Loader2 className="animate-spin text-[#1E4D3B]" size={40} />
                </div>
             ) : comments.length > 0 ? (
                (() => {
                   const rootComments = comments.filter(c => !c.parent_id);
                   const replies = comments.filter(c => c.parent_id);

                   return rootComments.map((c) => (
                      <div key={c.id} className="space-y-4">
                         <div className="group p-6 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-[#1E4D3B]/10 hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 relative">
                            <div className="flex items-start justify-between mb-3">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-[#1E4D3B]/5 text-[#1E4D3B] flex items-center justify-center font-black text-[14px] shadow-inner">
                                     {c.name[0].toUpperCase()}
                                  </div>
                                  <div>
                                     <h4 className="font-black text-sm text-gray-900 tracking-tight">{c.name}</h4>
                                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest opacity-60 mt-0.5">
                                        {new Date(c.created_at).toLocaleDateString()} • {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                     </p>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => handleDeleteComment(c.id)}
                                 className="opacity-0 group-hover:opacity-100 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all hover:shadow-sm"
                               >
                                  <Trash2 size={18} />
                                </button>
                            </div>
                             <p className="text-[14px] text-gray-600 leading-relaxed pl-12 font-medium italic opacity-85">"{c.comment}"</p>
                             
                             <div className="mt-4 pl-12 flex items-center gap-4">
                                <button 
                                  onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                                  className="text-[10px] font-black text-[#1E4D3B] uppercase tracking-[.2em] hover:text-[#143629] transition-all flex items-center gap-2 group/btn"
                                >
                                   <MessageSquare size={14} className="group-hover/btn:scale-110 transition-transform" />
                                   {replyingTo === c.id ? 'Cancel' : 'Admin Reply'}
                                </button>
                             </div>

                             {replyingTo === c.id && (
                                <form onSubmit={handleAdminReply} className="mt-6 ml-12 animate-in slide-in-from-top-4 duration-500">
                                   <div className="relative group/field">
                                      <textarea 
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write your response..."
                                        className="w-full p-6 pr-16 bg-white border border-[#1E4D3B]/10 rounded-[1.5rem] text-[13px] font-medium focus:outline-none focus:ring-4 focus:ring-[#1E4D3B]/5 focus:border-[#1E4D3B]/20 resize-none h-28 shadow-inner transition-all"
                                        autoFocus
                                      />
                                      <button 
                                        type="submit"
                                        disabled={isSubmittingReply || !replyText.trim()}
                                        className="absolute bottom-4 right-4 p-3 bg-[#1E4D3B] text-white rounded-xl hover:bg-[#143629] disabled:bg-gray-100 transition-all shadow-xl shadow-green-900/10 active:scale-90"
                                      >
                                         {isSubmittingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={18} className="stroke-[2.5]" />}
                                      </button>
                                   </div>
                                </form>
                             )}
                          </div>

                         {replies.filter(r => r.parent_id === c.id).length > 0 && (
                            <div className="ml-16 space-y-3 border-l-2 border-[#1E4D3B]/5 pl-6">
                               {replies.filter(r => r.parent_id === c.id).map(reply => (
                                  <div key={reply.id} className="group p-5 bg-[#1E4D3B]/[0.02] rounded-[1.5rem] border border-[#1E4D3B]/5 hover:bg-white hover:shadow-lg hover:shadow-green-900/[0.03] transition-all duration-500 relative">
                                     <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2.5">
                                           <div className="w-8 h-8 rounded-xl bg-[#1E4D3B] text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-green-900/20">
                                              AD
                                           </div>
                                           <div>
                                             <h5 className="font-black text-[12px] text-gray-800 tracking-tight">{reply.name}</h5>
                                             <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest opacity-60">Verified Admin</p>
                                           </div>
                                        </div>
                                        <button 
                                          onClick={() => handleDeleteComment(reply.id)}
                                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 rounded-lg transition-all"
                                        >
                                           <Trash2 size={14} />
                                        </button>
                                     </div>
                                     <p className="text-[12px] text-gray-500 leading-relaxed pl-10 font-medium italic opacity-85">"{reply.comment}"</p>
                                  </div>
                               ))}
                            </div>
                         )}
                      </div>
                   ));
                })()
             ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 animate-in fade-in duration-1000">
                   <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200">
                      <MessageCircle size={40} className="stroke-[1.5]" />
                   </div>
                   <div>
                      <p className="font-black text-gray-400 uppercase tracking-[.2em] text-xs">No active discussions</p>
                      <p className="text-[10px] text-gray-300 font-bold mt-1">Comments will appear here once users contribute.</p>
                   </div>
                </div>
             )}
          </div>

          <div className="p-8 border-t border-gray-50 bg-gray-50/10 text-center">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Institutional Grade Governance • PCHC Admin</p>
          </div>
       </div>
    </div>
  );
};

export default BlogManager;
