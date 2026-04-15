"use client";

import Image from "next/image";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type Props = {
  sourceKey: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
};

export function HeroBackgroundVideo({ sourceKey, title, thumbnail, videoUrl }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) {
      setVideoReady(false);
      return;
    }

    setVideoReady(false);

    const onLoadedData = () => setVideoReady(true);
    const onError = () => setVideoReady(false);

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);

    const isHlsSource = /\.m3u8($|\?)/i.test(videoUrl);
    let hls: Hls | null = null;

    if (isHlsSource) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      } else if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
      }
    } else {
      video.src = videoUrl;
    }

    video.play().catch(() => {
      // Autoplay can be blocked by browser policies; poster remains visible.
      setVideoReady(false);
    });

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
      if (hls) hls.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [sourceKey, videoUrl]);

  return (
    <>
      <Image
        src={thumbnail}
        alt={title}
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
      />
      {videoUrl ? (
        <video
          ref={videoRef}
          key={`${sourceKey}-${videoUrl || "poster"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={thumbnail}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
    </>
  );
}
