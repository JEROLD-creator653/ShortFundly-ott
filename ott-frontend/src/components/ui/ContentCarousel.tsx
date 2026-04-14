'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaCard from './MediaCard';

interface ContentCarouselProps {
  title: string;
  items: Array<{ id: string; title: string; img?: string; isPremium?: boolean; type?: 'NEW' | 'FREE' }>;
}

export default function ContentCarousel({ title, items }: ContentCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="flex justify-between items-end mb-4 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white/95">{title}</h2>
        <button className="text-xs text-primary hover:text-white transition-colors uppercase font-bold tracking-wider">View All &gt;</button>
      </div>

      <div className="relative group/carousel">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-primary text-white rounded-r-lg opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-sm shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, idx) => (
            <div key={item.id || idx} className="snap-start shrink-0">
              <MediaCard id={item.id} title={item.title} img={item.img} isPremium={item.isPremium} type={item.type} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-primary text-white rounded-l-lg opacity-0 group-hover/carousel:opacity-100 transition-all backdrop-blur-sm shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
