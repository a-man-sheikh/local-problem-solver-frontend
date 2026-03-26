import React from 'react';

/**
 * Interactive Map Home Page
 */
export default function Home() {
  return (
    <main className="relative flex-grow h-full pt-16">
      {/* Map Background Mockup */}
      <div className="absolute inset-0 z-0 bg-surface-container-low overflow-hidden">
      </div>

      {/* Contextual FAB */}
      <button className="fixed right-6 bottom-32 md:bottom-12 z-50 bg-primary text-on-primary w-16 h-16 rounded-3xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </main>
  );
}
