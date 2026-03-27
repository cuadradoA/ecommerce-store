import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { getCartCount, user, logout, darkMode, toggleDarkMode } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-beige-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="no-underline">
          <span className="text-xl font-bold tracking-[0.3em] text-gray-900">ATELIER</span>
        </Link>

        <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto bg-white border-b md:border-none border-beige-200 md:bg-transparent p-6 md:p-0 gap-6 md:gap-12`}>
          <Link to="/" className="text-xs uppercase tracking-wider font-medium text-gray-900 no-underline hover:opacity-50 transition-opacity" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="text-xs uppercase tracking-wider font-medium text-gray-900 no-underline hover:opacity-50 transition-opacity" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          {user ? (
            <button className="text-xs uppercase tracking-wider font-medium text-gray-500 bg-transparent border-none cursor-pointer p-0 hover:opacity-50 transition-opacity" onClick={() => { logout(); setMenuOpen(false); }}>
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="text-xs uppercase tracking-wider font-medium text-gray-900 no-underline hover:opacity-50 transition-opacity" onClick={() => setMenuOpen(false)}>
              Account
            </Link>
          )}
        </div>

        <div className="flex items-center gap-8">
          <button 
            className="bg-transparent border-none text-lg cursor-pointer text-gray-900 hover:opacity-60 transition-opacity w-10 h-10 flex items-center justify-center rounded-full" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
          <Link to="/cart" className="relative text-xs uppercase tracking-wider font-medium text-gray-900 no-underline hover:opacity-50 transition-opacity">
            Bag
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-4 bg-accent text-white text-[10px] font-semibold px-1 py-0.5 rounded-full min-w-[16px] text-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button className="md:hidden bg-transparent border-none text-xl cursor-pointer text-gray-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;