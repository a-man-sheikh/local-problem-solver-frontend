import React from 'react';

const Register = () => {
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
              Join the <br /><span className="text-primary">Action.</span>
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
                <h2 className="text-3xl font-black font-headline tracking-tight text-on-surface">Join the Action.</h2>
              </div>

              <div className="space-y-4">
                {/* Header */}
                <div className="hidden md:block mb-4">
                  <h3 className="text-lg lg:text-xl font-bold font-headline text-on-surface">Create your account</h3>
                  <p className="text-on-surface-variant text-xs lg:text-sm mt-0.5">Start your civic journey today.</p>
                </div>

                {/* Form */}
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-0.5 lg:space-y-1">
                    <label className="text-[10px] lg:text-xs font-bold font-headline uppercase tracking-wider text-on-surface-variant ml-1">Full Name</label>
                    <input 
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface placeholder:text-zinc-400 text-sm" 
                      placeholder="Jane Doe" 
                      type="text" 
                    />
                  </div>
                  
                  <div className="space-y-0.5 lg:space-y-1">
                    <label className="text-[10px] lg:text-xs font-bold font-headline uppercase tracking-wider text-on-surface-variant ml-1">Email Address</label>
                    <input 
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface placeholder:text-zinc-400 text-sm" 
                      placeholder="jane@civic.modern" 
                      type="email" 
                    />
                  </div>

                  <div className="space-y-0.5 lg:space-y-1">
                    <label className="text-[10px] lg:text-xs font-bold font-headline uppercase tracking-wider text-on-surface-variant ml-1">Password</label>
                    <input 
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary-container focus:bg-surface-container-highest transition-all text-on-surface placeholder:text-zinc-400 text-sm" 
                      placeholder="••••••••" 
                      type="password" 
                    />
                  </div>

                  <button 
                    className="w-full py-2.5 lg:py-3 bg-gradient-to-b from-primary to-primary-container text-on-primary font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-transform mt-2 text-sm lg:text-base" 
                    type="submit"
                  >
                    Create Account
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
                  Already have an account?{' '}
                  <a className="text-primary font-bold hover:underline" href="/login">Log in</a>
                </p>
              </div>
            </div>

            {/* Terms Disclaimer */}
            <p className="text-[9px] lg:text-[10px] text-zinc-400 text-center mt-3 lg:mt-4 px-4 lg:px-6 leading-relaxed">
              By joining, you agree to the Civic Modern Terms of Service and Privacy Policy. Data-driven governance requires your informed consent.
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

export default Register;
