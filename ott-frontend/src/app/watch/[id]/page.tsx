export default async function WatchPage({ params }: { params: { id: string } }) {
  // Await the fetch natively in App Router
  const data = await fetch('http://localhost:3001/api/movies', { cache: 'no-store' }).then(res => res.json()).catch(() => null);
  
  let movie = null;
  if (data) {
    const allMovies = [...data.latestReleases, ...data.trendingNow];
    const resolvedParams = await params;
    movie = allMovies.find((m: any) => m.id === resolvedParams.id);
  }

  return (
    <div className="min-h-screen bg-black flex flex-col pt-4 md:pt-10 px-4 md:px-8">
      <div className="w-full max-w-[1400px] mx-auto aspect-video bg-[#050505] border border-white/[0.06] rounded-xl overflow-hidden relative shadow-2xl">
        {movie?.video ? (
          <video src={movie.video} controls autoPlay className="w-full h-full object-contain" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-white/50">
            {movie === null ? 'Loading Video Stream...' : 'Video Content Not Available'}
          </div>
        )}
      </div>
      
      <div className="max-w-[1400px] mx-auto w-full py-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{movie?.title || 'Unknown Title'}</h1>
        <div className="flex gap-3 mt-4">
          <span className="bg-white/[0.08] px-3 py-1 text-sm rounded border border-white/[0.1]">Subscribed</span>
          <span className="bg-white/[0.08] px-3 py-1 text-sm rounded border border-white/[0.1]">4K Ultra HD</span>
          <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 text-sm rounded font-medium border border-yellow-500/20">PREMIUM</span>
        </div>
        <p className="text-gray-400 mt-6 max-w-3xl leading-relaxed">
          Experience premium indie content streamed natively. This interactive video player mimics the original JWPlayer integration but bypasses CORS payload errors by rendering directly through Next.js server components and the custom proxy.
        </p>
      </div>
    </div>
  );
}
