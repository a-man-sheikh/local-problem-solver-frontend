import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
 * Main application layout
 * Wraps all authenticated routes with a Left Sidebar Drawer Navigation
 */
export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if authenticated
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  if (!token) {
    // Redirect unauthenticated users to login
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    // Clear all auth data from storage
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-background font-body text-on-background overflow-hidden h-screen flex flex-col w-full relative">
      {/* Floating Header */}
      <header className="fixed top-0 w-full z-40 flex justify-between items-start p-4 md:p-6 pointer-events-none">
        <div className="flex items-center gap-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow border border-zinc-200/50 dark:border-zinc-800/50 pointer-events-auto transition-transform hover:scale-[1.02]">
          <button 
            onClick={toggleSidebar} 
            className="p-1 -ml-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 active:scale-95"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'wght' 300" }}>menu</span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-orange-600 dark:text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            <h1 className="font-headline font-black tracking-widest text-zinc-900 dark:text-zinc-50 text-base uppercase">Civic Modern</h1>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 dark:bg-black/60 z-50 transition-opacity backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-2xl flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-orange-600 dark:text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
             <h2 className="font-headline font-black tracking-widest text-zinc-900 dark:text-zinc-50 text-lg uppercase">Menu</h2>
          </div>
          <button 
            onClick={closeSidebar} 
            className="p-2 -mr-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400 active:scale-95"
          >
            <span className="material-symbols-outlined font-light">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {/* Menu Items */}
          <Link 
            to="/" 
            onClick={closeSidebar} 
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${location.pathname === '/' ? 'bg-orange-50/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'}`}
          >
            <span className="material-symbols-outlined" style={location.pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>map</span>
            <span className="font-headline text-sm uppercase tracking-wider">Map Dashboard</span>
          </Link>
          
          <Link 
            to="/report" 
            onClick={closeSidebar} 
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${location.pathname === '/report' ? 'bg-orange-50/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'}`}
          >
            <span className="material-symbols-outlined" style={location.pathname === '/report' ? { fontVariationSettings: "'FILL' 1" } : {}}>add_circle</span>
            <span className="font-headline text-sm uppercase tracking-wider">Report Issue</span>
          </Link>
          
          <Link 
            to="/alerts" 
            onClick={closeSidebar} 
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${location.pathname === '/alerts' ? 'bg-orange-50/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'}`}
          >
            <span className="material-symbols-outlined" style={location.pathname === '/alerts' ? { fontVariationSettings: "'FILL' 1" } : {}}>notifications</span>
            <span className="font-headline text-sm uppercase tracking-wider">Alerts & Updates</span>
          </Link>
          
          <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-4 mx-2" />
          
          <Link 
            to="/profile" 
            onClick={closeSidebar} 
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${location.pathname === '/profile' ? 'bg-orange-50/80 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'}`}
          >
            <span className="material-symbols-outlined" style={location.pathname === '/profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
            <span className="font-headline text-sm uppercase tracking-wider">My Profile</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all active:scale-[0.98] font-medium justify-center border border-red-100 dark:border-red-900/50"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-headline text-sm uppercase tracking-widest font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 w-full overflow-hidden flex flex-col relative z-0">
        <Outlet />
      </div>
    </div>
  );
}
