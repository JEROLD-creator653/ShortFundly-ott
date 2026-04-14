'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface BannerMovie {
  id: string;
  title: string;
  img: string;
  isPremium?: boolean;
  metadata?: string;
}

export default function HeroBanner({ banners }: { banners: BannerMovie[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!banners || banners.length === 0) return null;

  const activeMovie = banners[activeIndex];

  return (
    <div className="relative w-full h-[65vh] min-h-[550px] bg-[#000000] overflow-hidden border-b border-white/[0.05]">
      {/* Dynamic Main Poster on the Right Background */}
      <div className="absolute right-0 top-0 h-full w-[80%] md:w-[65%] flex justify-end">
        {/* Glow behind image mimicking the vibrant radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/50 via-black/10 to-transparent blur-[100px] scale-110 pointer-events-none"></div>
        
        {/* Main image representing the loaded activeMovie poster */}
        <div className="relative w-full h-full gradient-mask-l flex justify-end">
          <Image 
            src={activeMovie.img} 
            alt={activeMovie.title}
            fill
            className="object-cover object-center mix-blend-screen opacity-90 transition-opacity duration-500 ease-in-out"
            unoptimized
          />
        </div>
        
        {/* Extensive Leftward fade out to merge smoothly with the strict pure-black side */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#000000] via-[#000000]/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#000000] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Foreground Interactive Content Left side */}
      <div className="relative z-20 h-full w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col justify-end pb-10">
        <div className="max-w-xl md:max-w-2xl">
          {/* Metadata Badges exactly per photo references */}
          <div className="flex gap-2 mb-3">
            <div className="bg-[#eab308] text-black px-2.5 py-0.5 text-[11px] font-extrabold rounded shadow-md tracking-wider">
              ✦ Premium
            </div>
            <div className="bg-black/60 border border-white/20 text-white px-2 py-0.5 text-[11px] font-bold rounded tracking-widest backdrop-blur-sm">
              U/A
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-3 drop-shadow-2xl tracking-tight leading-none">
            {activeMovie.title}
          </h1>
          
          <p className="text-white/60 text-sm md:text-[15px] font-medium mb-6">
            {activeMovie.metadata || "2026 • 20m • Drama • Tamil"}
          </p>

          <div className="flex gap-3">
            <Link href={`/watch/${activeMovie.id}`} className="bg-[#E41E26] hover:bg-[#c4151c] text-white px-8 py-3 rounded font-bold text-sm flex items-center gap-2 shadow-lg transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Play
            </Link>
            <button className="bg-black/40 border border-white/20 hover:bg-white/10 text-white px-6 py-3 rounded font-bold text-sm flex items-center gap-2 backdrop-blur-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              My List
            </button>
          </div>
        </div>

        {/* The requested bottom-left Miniature Interactive Carousel Selector */}
        <div className="mt-8 flex gap-3 z-30">
          {banners.map((banner, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-[72px] sm:h-20 aspect-video rounded-md overflow-hidden border-2 transition-all duration-300 shadow-2xl ${
                  activeIndex === idx ? 'border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/40'
              }`}
            >
              <Image src={banner.img} alt={banner.title} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
