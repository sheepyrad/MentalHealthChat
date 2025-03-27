
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, [location]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mental-400 to-mental-600 flex items-center justify-center">
            <span className="text-white font-medium text-lg">M</span>
          </div>
          <span className="font-medium text-lg">MentalHealthChat</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
          {isAuthenticated && (
            <NavLink to="/chat" active={location.pathname === "/chat"}>Chat</NavLink>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          ) : (
            <Button onClick={handleGetStarted} className="px-4 py-2 rounded-full bg-mental-500 text-white hover:bg-mental-600 transition-colors">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

type NavLinkProps = {
  to: string;
  active: boolean;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`relative py-1 transition-colors ${
        active 
          ? 'text-mental-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mental-500' 
          : 'text-foreground hover:text-mental-600'
      }`}
    >
      {children}
    </Link>
  );
};
