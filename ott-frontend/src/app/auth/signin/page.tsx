import Link from 'next/link';

export default function Signin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 glass rounded-2xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-primary/20 blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Sign In</h1>
            <p className="text-white/60 text-sm mt-2">Welcome back to Shortfundly Premium</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-black/50 border border-white/[0.1] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-black/50 border-white/[0.1] text-primary focus:ring-primary" />
                <span className="text-white/70">Remember me</span>
              </label>
              <Link href="#" className="text-primary hover:text-orange-400">Forgot password?</Link>
            </div>
            <button type="button" className="w-full py-3 mt-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(251,90,50,0.3)]">
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-white/60 text-sm">
              Don't have an account? <Link href="#" className="text-primary hover:text-orange-400 font-medium">Subscribe Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
