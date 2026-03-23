import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchData } from '../utils/api.js';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await fetchData('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Inquiry from Contact Page',
          message: formData.message
        })
      });
      console.log('Message sent successfully to backend');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="text-red-500 font-semibold p-4 bg-red-50 rounded-xl">{error}</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center text-center space-y-3">
          <p className='text-xl sm:text-2xl text-green-800 font-bold'>Thank you for your message!</p>
          <p className="text-green-600">We've received your inquiry and will get back to you soon.</p>
          <button onClick={() => setSubmitted(false)} className="text-sm font-bold text-green-600 hover:text-green-700 underline mt-2">Send another message</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <input 
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Your Name"
            className='w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50'
          />
          <input 
            type="email" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Your Email" 
            className='w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50'
          />
          <textarea 
            required 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Your Message" 
            className='w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 resize-none'
            rows={5}
          ></textarea>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-500 text-white px-4 py-4 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;