import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex flex-col w-full z-50 sticky top-0 flex-none shadow-sm">
      {/* Top Red Promotion Bar */}
      <div className="bg-[#D20000] text-white w-full py-1.5 px-4 flex justify-between items-center text-xs md:text-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10 relative">
        <button className="text-white/60 hover:text-white rounded-full bg-white/10 p-0.5 w-5 h-5 flex items-center justify-center font-bold">×</button>
        <div className="flex-1 text-center font-semibold opacity-95 tracking-wide">
          Get the Shortfundly app on Google Play & App Store
        </div>
        <button className="bg-white text-[#D20000] px-3 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase hover:bg-gray-100 transition-colors shadow-sm">
          GET APP
        </button>
      </div>

      {/* Main White Navbar Element */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm relative z-20">
        <div className="flex h-16 items-center px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute w-5 h-5 bg-[#FB5A32] rounded-full left-0 mix-blend-multiply opacity-90"></div>
                <div className="absolute w-5 h-5 bg-black rounded-full right-0 mix-blend-multiply opacity-80"></div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-black hidden sm:block">Shortfundly</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for 'Movie'"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-[#f3f4f6] text-black placeholder-gray-500 focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300 sm:text-sm transition-colors shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="hidden sm:flex items-center gap-1.5 border border-[#eab308] text-[#ca8a04] hover:bg-yellow-50 px-5 py-1.5 rounded-md font-bold text-sm transition-colors uppercase tracking-wider">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1022 12A10 10 0 0012 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/></svg>
              Subscribe
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
