export interface MovieModel {
    id: number;

    movieId: string;
    title: string;
    description: string;
    shortDescription: string;
    createdAt: string;
    originalTitle: string;
    runTime: number;
    poster: string;
    director: Director;
    movieActors: MovieActor[];
    movieGenres: MovieGenre[];
    theater: { id: number; name: string; location: string };
    shortUrl: string;
} 
export interface Director {
  directorId: number;
  name: string;
  createdAt: string;
}
export interface MovieActor {
  movieActorId: number;
  movieId: number;
  actorId: number;
  actor: { 
      name: string;
      createdAt: string;
      actorId: number;
  };
}

  
  export interface Genre {
    genreId: number;
    name: string;
    createdAt: string;
  }
  
  export interface MovieGenre {
    movieGenreId: number;
    movieId: number;
    genreId: number;
    genre: Genre;  
}