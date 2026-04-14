import Image from 'next/image';
import Link from 'next/link';

interface MediaCardProps {
  id?: string;
  title: string;
  img?: string;
  isPremium?: boolean;
  type?: 'NEW' | 'FREE';
}

export default function MediaCard({ id = "1", title, img, isPremium, type }: MediaCardProps) {
  return (
    <Link href={`/watch/${id}`} className="group relative flex flex-col gap-2 w-40 sm:w-48 lg:w-56 shrink-0 cursor-pointer text-left">
      <div className="relative aspect-[2/3] w-full glass group-hover:glass-hover transition-all duration-300 overflow-hidden rounded-lg">
        {img ? (
          <Image src={img} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg" unoptimized />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-105 transition-transform duration-500">
             <div className="absolute w-24 h-24 bg-primary/70 rounded-full -ml-8 mix-blend-screen blur-xl"></div>
             <div className="absolute w-24 h-24 bg-yellow-500/70 rounded-full ml-12 mix-blend-screen blur-xl"></div>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          {isPremium && (
            <span className="px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-bold rounded-sm tracking-wider shadow-lg">
              ✦ PREMIUM
            </span>
          )}
          {type && (
            <span className={`px-2 py-0.5 text-white text-[10px] font-bold rounded-sm tracking-wider shadow-lg ${type === 'NEW' ? 'bg-teal-500' : 'bg-emerald-500'}`}>
              {type}
            </span>
          )}
        </div>
      </div>
      <h3 className="font-medium text-sm text-white/90 truncate group-hover:text-primary transition-colors">{title}</h3>
    </Link>
  );
}
