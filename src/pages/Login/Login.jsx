import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData);
      
      if (response.data?.success && response.data?.data) {
        const { accessToken, refreshToken, user } = response.data.data;
        
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        if (user) localStorage.setItem('user', JSON.stringify(user));
      } else if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      // Redirect to home dashboard
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Login failed. Please try again.';
        
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 md:px-6 py-4 md:py-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Side: Editorial Content */}
          <div className="hidden md:flex flex-col space-y-4 pr-4 md:pr-8">
            <div className="inline-flex items-center space-x-2 text-primary font-headline font-bold tracking-widest uppercase text-xs md:text-sm">
              <span className="material-symbols-outlined text-[20px]" data-icon="location_on">location_on</span>
              <span>Civic Modern</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black font-headline tracking-tighter leading-[1] text-on-surface">
              Welcome <br /><span className="text-primary">Back.</span>
            </h1>

            <p className="text-base lg:text-lg text-on-surface-variant max-w-md leading-relaxed">
              Access the architectural heart of your community. Report issues, track progress, and build a better city through modern civic engagement.
            </p>

            <div className="relative h-40 lg:h-48 w-full rounded-xl overflow-hidden shadow-2xl shadow-on-surface/5">
              <img 
                alt="modern city street" 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
              <div className="absolute bottom-3 left-4 text-white">
                <p className="font-headline font-bold text-sm lg:text-base">Downtown District</p>
                <p className="text-[10px] lg:text-xs opacity-80">Updated 2 minutes ago</p>
              </div>
            </div>
          </div>

          {/* Right Side: Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-surface-container-lowest rounded-xl p-5 md:p-6 lg:p-8 shadow-sm border border-outline-variant/10">
              
              {/* Mobile Logo */}
              <div className="md:hidden mb-4 flex flex-col items-center text-center">
                <div className="text-primary mb-2">
                  <span className="material-symbols-outlined text-4xl" data-icon="account_balance">account_balance</span>
                </div>
                <h2 className="text-3xl font-black font-headline tracking-tight text-on-surface">Welcome Back.</h2>
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div className="hidden md:block mb-4">
                  <h3 className="text-lg lg:text-xl font-bold font-headline text-on-surface">Log in to your account</h3>
                  <p className="text-on-surface-variant text-xs lg:text-sm mt-0.5">Resume your civic journey.</p>
                </div>

                {/* Form */}
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-500 text-xs font-medium">{error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-0.5 lg:space-y-1">
                    <label className="text-[10px] lg:text-xs font-bold font-headline uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface placeholder:text-zinc-400 text-sm" 
                      placeholder="jane@civic.modern" 
                      type="email" 
                      required
                    />
                  </div>

                  <div className="space-y-0.5 lg:space-y-1">
                    <label className="text-[10px] lg:text-xs font-bold font-headline uppercase tracking-wider text-on-surface-variant ml-1">Password</label>
                    <input 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface placeholder:text-zinc-400 text-sm" 
                      placeholder="••••••••" 
                      type="password" 
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <a className="text-[10px] lg:text-xs text-primary font-bold hover:underline" href="/forgot-password">
                      Forgot Password?
                    </a>
                  </div>

                  <button 
                    className="w-full py-2.5 lg:py-3 bg-gradient-to-b from-primary to-primary-container text-on-primary font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform mt-2 text-sm lg:text-base disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex justify-center items-center" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center py-1 lg:py-2">
                  <div className="flex-grow border-t border-surface-container-high"></div>
                  <span className="flex-shrink mx-4 text-[9px] lg:text-[10px] font-headline font-bold text-zinc-400 uppercase tracking-widest">or continue with</span>
                  <div className="flex-grow border-t border-surface-container-high"></div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <button className="flex items-center justify-center space-x-1.5 lg:space-x-2 py-2 lg:py-2.5 border border-surface-container-high rounded-xl hover:bg-surface-container-low transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-base lg:text-lg" data-icon="google">google</span>
                    <span className="text-xs lg:text-sm font-semibold font-headline">Google</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1.5 lg:space-x-2 py-2 lg:py-2.5 border border-surface-container-high rounded-xl hover:bg-surface-container-low transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-base lg:text-lg" data-icon="apple">ios</span>
                    <span className="text-xs lg:text-sm font-semibold font-headline">Apple</span>
                  </button>
                </div>

                {/* Footer Link */}
                <p className="text-center text-xs lg:text-sm text-on-surface-variant mt-2 lg:mt-4">
                  Don't have an account?{' '}
                  <a className="text-primary font-bold hover:underline" href="/register">Register</a>
                </p>
              </div>
            </div>

            {/* Terms Disclaimer */}
            <p className="text-[9px] lg:text-[10px] text-zinc-400 text-center mt-3 lg:mt-4 px-4 lg:px-6 leading-relaxed">
              By logging in, you agree to the Civic Modern Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-screen bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
    </div>
  );
};

export default Login;
