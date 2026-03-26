import { useState } from 'react';

export default function Report() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <main className="pt-20 px-4 md:px-6 max-w-2xl mx-auto flex-1 w-full flex flex-col h-full pb-6">
      {/* Stepper / Progress */}
      <div className="mb-6 shrink-0">
        <h2 className="font-headline text-3xl font-black text-on-surface leading-none mb-6">
          Report an<br />
          <span className="text-primary-container">Issue</span>
        </h2>
        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex flex-col items-center gap-1 bg-background">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-label text-sm ${step >= 1 ? 'bg-primary text-on-primary shadow-sm shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'}`}>
              1
            </div>
            <span className={`font-label text-[9px] font-bold uppercase tracking-tighter ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>
              Capture
            </span>
          </div>
          <div className={`flex-1 h-[2px] mx-1 mt-[-14px] ${step >= 2 ? 'bg-primary' : 'bg-surface-container-high'}`}></div>
          <div className="flex flex-col items-center gap-1 bg-background">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-label text-sm ${step >= 2 ? 'bg-primary text-on-primary shadow-sm shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'}`}>
              2
            </div>
            <span className={`font-label text-[9px] font-bold uppercase tracking-tighter ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>
              Category
            </span>
          </div>
          <div className={`flex-1 h-[2px] mx-1 mt-[-14px] ${step >= 3 ? 'bg-primary' : 'bg-surface-container-high'}`}></div>
          <div className="flex flex-col items-center gap-1 bg-background">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-label text-sm ${step >= 3 ? 'bg-primary text-on-primary shadow-sm shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'}`}>
              3
            </div>
            <span className={`font-label text-[9px] font-bold uppercase tracking-tighter ${step >= 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
              Details
            </span>
          </div>
        </div>
      </div>

      <section className="flex-1 flex flex-col overflow-y-auto shrink min-h-0 relative">
        <div className="flex-1 flex flex-col justify-center">
          {step === 1 && (
            <div className="relative group cursor-pointer overflow-hidden rounded-xl bg-surface-container-low w-full h-full min-h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-outline-variant hover:border-primary-container transition-all duration-300">
              <img 
                alt="Camera Placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all group-hover:opacity-30 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKEm_Sm1G1pip0TfMpLCaSyJ_MnqfvZv3DMV99w04jCZ-quVgm9h9axGZUxBpVpeYFyxrVHONPTTf3CiE5cMu4skdvnKCAxcxgyTCOrPOHYjeXcatVkSoX3V5XQlGQDCmYXpBrsKJuOvVdn8Noq-lj9JQoqL9glCfLz51gQsso2MN1LRLHJd9knUoBjsCecToqDUdegWc4SZwicbmX4bzz6dhbhky7PmGZ2hbachfHDO3_4I18tu20wQN2Qz1GqiHAiJzZLcz05CY"
              />
              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-4 shadow-xl shadow-primary-container/20">
                  <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface">Tap to capture issue</h3>
                <p className="font-body text-sm text-on-surface-variant mt-2 max-w-xs">High-quality photos help our teams identify the problem faster.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col justify-center">
              <label className="font-headline font-bold text-sm uppercase tracking-widest text-zinc-500">Select Category</label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: 'road', icon: 'edit_road', label: 'Road' },
                  { id: 'water', icon: 'water_drop', label: 'Water' },
                  { id: 'waste', icon: 'delete_outline', label: 'Waste' },
                  { id: 'lighting', icon: 'lightbulb', label: 'Lighting' },
                  { id: 'greenery', icon: 'park', label: 'Greenery' },
                  { id: 'other', icon: 'more_horiz', label: 'Other' },
                ].map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all group ${category === cat.id ? 'bg-orange-50 dark:bg-orange-900/20 border-primary-container shadow-sm' : 'bg-surface-container-lowest border-transparent hover:border-primary-container hover:bg-orange-50/50 dark:hover:bg-orange-900/20'}`}
                  >
                    <span className={`material-symbols-outlined text-2xl mb-2 transition-transform group-hover:scale-110 ${category === cat.id ? 'text-primary' : 'text-primary-container'}`}>
                      {cat.icon}
                    </span>
                    <span className={`font-label text-[10px] font-bold uppercase tracking-tighter ${category === cat.id ? 'text-primary' : 'text-on-surface'}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col justify-center">
              {/* Location (Detected) */}
              <div className="bg-surface-container-low rounded-xl p-4 flex items-center justify-between overflow-hidden relative gap-2 shrink-0">
                <div className="relative z-10 flex-1">
                  <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Detected Location</label>
                  <h4 className="font-headline font-bold text-sm text-on-surface truncate">452 Civic Avenue</h4>
                  <p className="font-body text-xs text-on-surface-variant truncate">Lat: 40.7128°, Lng: -74.0060°</p>
                </div>
                <button className="relative z-10 bg-white dark:bg-zinc-800 shadow-sm p-2 rounded-full text-primary active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </button>
              </div>
              
              {/* Title */}
              <div className="space-y-2 shrink-0">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-zinc-500">Issue Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-high border-none rounded-xl p-3 font-body text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface" 
                  placeholder="E.g. Broken streetlight" 
                />
              </div>

              {/* Description */}
              <div className="space-y-2 flex-1 flex flex-col min-h-[100px]">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-zinc-500 shrink-0">Provide Details</label>
                <textarea 
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-surface-container-high border-none rounded-xl p-3 font-body text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all resize-none text-on-surface flex-1 min-h-0" 
                  placeholder="Briefly describe the issue..." 
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-auto flex gap-3 shrink-0">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="py-3 px-5 bg-surface-container-high text-on-surface-variant font-headline font-bold text-sm uppercase tracking-[0.1em] rounded-xl hover:bg-surface-container-highest active:scale-[0.98] transition-all"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="flex-1 py-3 bg-primary text-on-primary font-headline font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-[0_4px_14px_0_rgba(176,47,0,0.39)] hover:shadow-[0_6px_20px_rgba(176,47,0,0.23)] hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Next
            </button>
          ) : (
            <button 
              className="flex-1 py-3 bg-primary text-on-primary font-headline font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-[0_4px_14px_0_rgba(176,47,0,0.39)] hover:shadow-[0_6px_20px_rgba(176,47,0,0.23)] hover:bg-primary/90 active:scale-[0.98] transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 transition-transform group-hover:scale-105 inline-block">Submit Report</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
