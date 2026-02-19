import { cn } from '@/lib/utils';
import { Briefcase, Code2, Home, Info, LogIn, LogOut, Mail, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const Sidebar = ({ onAuthClick, isAuthenticated, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-secondary" />
          <span className="text-2xl font-heading font-bold text-white">ZynLoft Solutions</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              data-testid={`nav-${item.name.toLowerCase()}`}
              onClick={() => scrollToSection(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 pb-6">
        {isAuthenticated ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-lg">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-300 truncate">{user?.email}</span>
            </div>
            <Button
              data-testid="logout-button"
              onClick={onLogout}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-white/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            data-testid="login-button"
            onClick={onAuthClick}
            className="w-full bg-secondary hover:bg-secondary-hover text-white"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login / Register
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      <button
        data-testid="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-primary shadow-xl flex flex-col z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;