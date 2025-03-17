import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { TheaterService } from './theater.service';
const client = axios.create({
  baseURL: 'https://movie.pequla.com/api/movie',
  headers: {
    'Accept': 'application/json',
  },
  validateStatus: (status: number) => status === 200
});

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private theaterService: TheaterService) { }
  private movies: MovieModel[] = [];
  public async fetchMovies(): Promise<MovieModel[]> {
    try {
        const url = 'https://movie.pequla.com/api/movie';

        const response = await client.get(url);

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Movies array detected:', response.data);
            this.movies = response.data;
            return this.movies;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

  
  
  

  public getStoredMovies(): MovieModel[] {
    return this.movies;
  }

  public async getMovieById(id: number): Promise<MovieModel | null> {
    try {
      const response = await client.get(`/${id}`);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      return null;
    }
  }

  public async getMovies(): Promise<MovieModel[]> {
    try {
      const response = await client.get<MovieModel[]>('');
      const movies = response.data || [];
  
      return movies.map(movie => {
        console.log('Processing movie:', movie); // 🟢 Log each movie
  
        const theater = movie.theater?.id 
          ? this.theaterService.getTheaterById(movie.theater.id) 
          : null;
  
        return {
          ...movie,
          location: theater ? theater.location : 'Beograd',
          theater: theater || { id: 1, name: 'BioScope Beograd', location: 'Beograd' },
        };
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
  
  
}
  
  
  