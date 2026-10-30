import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout.js'
import Home from './Pages/Home.js'
import Contact from './Pages/Contact.js'
import About from './Pages/About.js'
import Gallery from './Components/Gallery.js'
import Blog from './Pages/Blog.js'
import Donate from './Pages/Donate.js'
import ScrollToHash from './Components/ScrollToHash.js'
import ScrollToTop from './Components/ScrollToTop.js'
import Maintenance from './Pages/Maintenance.js'

// Admin Components
import { AuthProvider } from './Context/AuthContext.js'
import AdminLayout from './Admin/Layout/AdminLayout.js'
import Login from './Admin/Pages/Login.js'
import Dashboard from './Admin/Pages/Dashboard.js'
import ContentManager from './Admin/Pages/ContentManager.js'
import BlogManager from './Admin/Pages/BlogManager.js'
import TeamManager from './Admin/Pages/TeamManager.js'
import GalleryManager from './Admin/Pages/GalleryManager.js'
import MessageManager from './Admin/Pages/MessageManager.js'
import DonationManager from './Admin/Pages/DonationManager.js'
import SettingsManager from './Admin/Pages/SettingsManager.js'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  // return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
  return <>{children}</>;
};

function AppContent() {
  // Query parameter controls:
  // - ?dev=true / ?preview=true / ?bypass=true : unlock session to preview normal web
  // - ?maintenance=true / ?lock=true : lock back into maintenance mode
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  if (searchParams) {
    if (
      searchParams.get('bypass') === 'true' ||
      searchParams.get('preview') === 'true' ||
      searchParams.get('dev') === 'true'
    ) {
      sessionStorage.setItem('pchc_bypass_maintenance', 'true');
    } else if (searchParams.get('maintenance') === 'true' || searchParams.get('lock') === 'true') {
      sessionStorage.removeItem('pchc_bypass_maintenance');
    }
  }

  const isBypassed = typeof window !== 'undefined' && sessionStorage.getItem('pchc_bypass_maintenance') === 'true';

  // Maintenance mode is ACTIVE by default on all routes: clients NEVER see the normal website
  const isMaintenanceActive = !isBypassed;

  if (isMaintenanceActive) {
    return (
      <Routes>
        {/* Admin Login: still accessible */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="blogs" element={<BlogManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="messages" element={<MessageManager />} />
                <Route path="donations" element={<DonationManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* All other routes show Maintenance in production */}
        <Route path="*" element={<Maintenance />} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <Routes>
        {/* Route for previewing maintenance page in dev */}
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Admin Login: No Layout */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="blogs" element={<BlogManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="messages" element={<MessageManager />} />
                <Route path="donations" element={<DonationManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Public Routes: Wrapped in MainLayout */}
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/about' element={<About />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/work' element={<Home />} />
              <Route path='/blogs' element={<Blog />} />
              <Route path='/donate' element={<Donate />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
