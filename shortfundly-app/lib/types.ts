export type Film = {
  id?: string;
  slug: string;
  title: string;
  genre: string;
  duration: string;
  year: number;
  rating: number;
  premium: boolean;
  thumbnail: string;
  synopsis: string;
  festival?: string;
  videoUrl: string;
};
