import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import categoryService from '@/services/categoryService';
import problemService from '@/services/problemService';
import LocationPicker from '@/components/ui/LocationPicker';
import useGeolocation from '@/hooks/useGeolocation';

export default function Report() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const {
    position: geoPosition,
    loading: geoLoading,
    error: geoError,
    getCurrentPosition,
  } = useGeolocation();

  /* ─── Sync geolocation result into the location state ─── */
  useEffect(() => {
    if (geoPosition) {
      setLocation(geoPosition);
    }
  }, [geoPosition]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await categoryService.getCategories();
        if (response.data && response.data.success) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleLocationChange = useCallback((pos) => {
    setLocation(pos);
  }, []);

  /* ─── Image Handling ─── */
  const handleImageSelected = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    /* Validate file type */
    if (!file.type.startsWith('image/')) return;

    /* Validate size: 10 MB max */
    if (file.size > 10 * 1024 * 1024) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
    /* Reset both inputs so the same file can be re-selected */
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  /* ─── Submit Handler ─── */
  const handleSubmit = async () => {
    /* Basic validation */
    if (!title.trim()) {
      toast.error('Please enter a title for the issue.');
      return;
    }
    if (!details.trim()) {
      toast.error('Please describe the issue.');
      return;
    }
    if (!category) {
      toast.error('Please select a category.');
      return;
    }
    if (!location) {
      toast.error('Please pin a location on the map.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: details.trim(),
        category,
        images: [],
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
          ...(address.trim() ? { address: address.trim() } : {}),
        },
      };

      const response = await problemService.createProblem(payload);

      if (response.data?.success) {
        toast.success('Report submitted successfully!');
        navigate('/');
      } else {
        toast.error(response.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to submit report. Please try again.';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

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
            <div className="flex-1 flex flex-col justify-center gap-4">
              {/* ─── Hidden File Inputs ─── */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelected}
                className="hidden"
                id="camera-input"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/heic"
                onChange={handleImageSelected}
                className="hidden"
                id="file-input"
              />

              {imagePreview ? (
                /* ─── Image Preview ─── */
                <div className="relative overflow-hidden rounded-xl bg-surface-container-low w-full min-h-[40vh] max-h-[50vh] flex items-center justify-center border-2 border-primary-container/30 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Issue preview"
                    className="w-full h-full object-contain max-h-[50vh]"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-error text-on-error flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>

                  {/* File info badge */}
                  <div className="absolute bottom-3 left-3 z-10 bg-on-surface/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg font-label text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>image</span>
                    {image?.name ? (
                      <span className="max-w-[120px] truncate">{image.name}</span>
                    ) : (
                      <span>Captured photo</span>
                    )}
                  </div>
                </div>
              ) : (
                /* ─── Upload / Capture Zone ─── */
                <div className="relative overflow-hidden rounded-xl bg-surface-container-low w-full min-h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-outline-variant transition-all duration-300">
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKEm_Sm1G1pip0TfMpLCaSyJ_MnqfvZv3DMV99w04jCZ-quVgm9h9axGZUxBpVpeYFyxrVHONPTTf3CiE5cMu4skdvnKCAxcxgyTCOrPOHYjeXcatVkSoX3V5XQlGQDCmYXpBrsKJuOvVdn8Noq-lj9JQoqL9glCfLz51gQsso2MN1LRLHJd9knUoBjsCecToqDUdegWc4SZwicbmX4bzz6dhbhky7PmGZ2hbachfHDO3_4I18tu20wQN2Qz1GqiHAiJzZLcz05CY"
                  />

                  <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 gap-5">
                    <div className="w-14 h-14 rounded-full bg-primary-container/15 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-base text-on-surface">Add a photo of the issue</h3>
                      <p className="font-body text-xs text-on-surface-variant mt-1 max-w-xs">Clear photos help our teams respond faster</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                      {/* Camera — visible mainly on mobile, still works on desktop webcam */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary-container text-on-primary font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-md shadow-primary-container/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.97] transition-all"
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                        Take Photo
                      </button>

                      {/* File upload — ideal for desktop */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high text-on-surface font-headline font-bold text-xs uppercase tracking-widest rounded-xl border border-outline-variant hover:border-primary-container hover:bg-surface-container-highest active:scale-[0.97] transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">upload_file</span>
                        Upload Image
                      </button>
                    </div>

                    <p className="font-body text-[10px] text-on-surface-variant/60 mt-1">
                      JPG, PNG, WebP or HEIC · Max 10 MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col justify-center">
              <label className="font-headline font-bold text-sm uppercase tracking-widest text-zinc-500">Select Category</label>
              {loadingCategories ? (
                <div className="flex justify-center items-center py-12">
                  <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button 
                      key={cat._id}
                      onClick={() => setCategory(cat._id)}
                      className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all group ${category === cat._id ? 'bg-orange-50 dark:bg-orange-900/20 border-primary-container shadow-sm' : 'bg-surface-container-lowest border-transparent hover:border-primary-container hover:bg-orange-50/50 dark:hover:bg-orange-900/20'}`}
                    >
                      <span className={`material-symbols-outlined text-2xl mb-2 transition-transform group-hover:scale-110 ${category === cat._id ? 'text-primary' : 'text-primary-container'}`}>
                        {cat.icon || 'category'}
                      </span>
                      <span className={`font-label text-center text-[10px] font-bold uppercase tracking-tighter ${category === cat._id ? 'text-primary' : 'text-on-surface'}`}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                  {categories.length === 0 && (
                    <div className="col-span-full text-center py-6 text-on-surface-variant font-body text-sm">
                      No categories available. Please check the server.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 flex-1 flex flex-col">
              {/* ─── Location Picker ─── */}
              <div className="shrink-0">
                <label className="font-headline font-bold text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
                  Pin Location
                </label>
                <LocationPicker
                  value={location}
                  onChange={handleLocationChange}
                  geoLoading={geoLoading}
                  geoError={geoError}
                  onUseMyLocation={getCurrentPosition}
                />
              </div>

              {/* Address (optional) */}
              <div className="space-y-2 shrink-0">
                <label className="font-headline font-bold text-xs uppercase tracking-widest text-zinc-500">Address (optional)</label>
                <input 
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface-container-high border-none rounded-xl p-3 font-body text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface" 
                  placeholder="E.g. Connaught Place, New Delhi" 
                />
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
              disabled={step === 2 && !category}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3 bg-primary text-on-primary font-headline font-black text-sm uppercase tracking-[0.2em] rounded-xl shadow-[0_4px_14px_0_rgba(176,47,0,0.39)] hover:shadow-[0_6px_20px_rgba(176,47,0,0.23)] hover:bg-primary/90 active:scale-[0.98] transition-all relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  Submitting…
                </span>
              ) : (
                <span className="relative z-10 transition-transform group-hover:scale-105 inline-block">Submit Report</span>
              )}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
