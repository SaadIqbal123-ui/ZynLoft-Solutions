import React, { useState, useEffect } from 'react';
import '@/App.css';
import Sidebar from './components/layout/Sidebar';
import AuthModal from './components/auth/AuthModal';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import { Toaster } from './components/ui/sonner';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Sidebar
        onAuthClick={() => setShowAuthModal(true)}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="md:ml-64 transition-all duration-300">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;