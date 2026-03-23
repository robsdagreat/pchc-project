-- PCHC Project Seed Data

-- Clear existing data (optional, but good for a fresh seed)
TRUNCATE admins, blogs, comments, gallery, team_members, contact_messages, donation_tiers, home_content RESTART IDENTITY CASCADE;

-- Default Super Admin (password: admin123)
-- In a real app, this should be a hashed password. For seeding, we use a placeholder or a pre-hashed string.
INSERT INTO admins (username, password_hash, role, permissions) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'super_admin', '{"manage_all"}');

-- Blog Posts
INSERT INTO blogs (title, content, author, category, media_url, media_type) VALUES 
('Empowering Youth Through Art', 'Art therapy has shown remarkable results in improving cognitive development and emotional expression among children in our community programs...', 'Sarah Johnson', 'Creative Arts', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', 'image'),
('Healthcare Access for All', 'Our recent medical outreach program reached over 500 families, providing essential screenings and health education in rural areas...', 'Dr. Robert Chen', 'Healthcare', 'https://images.unsplash.com/photo-1584515159902-12af1266eec6?auto=format&fit=crop&q=80&w=800', 'image'),
('The Future of Vocational Training', 'We are excited to announce the launch of our new computer literacy and vocational training center, designed to equip young adults with job-ready skills...', 'Michael Okoro', 'Education', 'https://images.unsplash.com/photo-1581092921461-eab62e92c73c?auto=format&fit=crop&q=80&w=800', 'image');

-- Team Members
INSERT INTO team_members (name, position, bio, photo_url, display_order) VALUES 
('Sarah Johnson', 'Executive Director', 'Sarah has over 15 years of experience in NGO management and community development...', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', 1),
('Dr. Robert Chen', 'Medical Programs Coordinator', 'A passionate advocate for healthcare equity with a background in public health...', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800', 2),
('Michael Okoro', 'Operations Manager', 'Michael oversees the day-to-day operations and strategic planning for our various initiatives...', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800', 3);

-- Donation Tiers
INSERT INTO donation_tiers (name, amount, impact_description) VALUES 
('Supporter', 25.00, 'Provides essential school supplies for one child for an entire semester.'),
('Guardian', 100.00, 'Covers the cost of a full medical check-up and basic treatment for a family of four.'),
('Champion', 500.00, 'Funds a complete vocational training module for one young adult in our job placement program.');

-- Home Content
INSERT INTO home_content (section_name, title, subtitle, description, cta_text, cta_link, image_url) VALUES 
('hero', 'Empowering Underprivileged Communities', 'Fostering growth through education, healthcare, and creative arts.', 'Join us in our mission to create a brighter future for those in need through sustainable community-driven programs.', 'Get Involved', '/get-involved', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200'),
('about', 'Who We Are', 'A dedicated team committed to positive change.', 'PCHC is a non-profit organization focused on providing inclusive services that empower individuals and strengthen community bonds.', 'Learn More', '/about', 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&q=80&w=1200');

-- Gallery
INSERT INTO gallery (title, url, category) VALUES 
('Youth Art Workshop', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800', 'Education'),
('Community Health Fair', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', 'Healthcare'),
('Vocational Graduation', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', 'Success Stories'),
('Art Exhibition 2025', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800', 'Creative Arts'),
('Mobile Clinic Outreach', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', 'Healthcare');
