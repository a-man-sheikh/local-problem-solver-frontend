import { Outlet } from 'react-router-dom';

/**
 * Main application layout
 * Wraps all authenticated routes with shared UI (header, sidebar, footer)
 */
export default function MainLayout() {
  return (
    <div className="app-layout">
      {/* TODO: Add <Header /> */}

      <main className="app-main">
        <Outlet />
      </main>

      {/* TODO: Add <Footer /> */}
    </div>
  );
}
