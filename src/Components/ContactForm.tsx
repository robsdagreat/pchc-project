import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
   
    formData.append('to_name', 'Pallotti Children Hope Center Team');

    emailjs.sendForm( 
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form,
        import.meta.env.VITE_API_KEY
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setSubmitted(true);
    }, (error) => {
      console.error('Failed to send email:', error);
      setError('Failed to send email. Please try again later.');
    });
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <p className='text-xl sm:text-2xl text-black hover:underline'>Thank you for your message! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <input 
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
          />
          <input 
            type="email" 
            name="from_email" 
            placeholder="Your Email" 
            required 
            className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            className='w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
            rows={4}
          ></textarea>
          <button type="submit" className="w-full bg-active2 text-white px-4 py-2 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactForm;