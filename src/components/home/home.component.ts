import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: MovieModel[] = [];
  error: string | null = null;

  constructor(public utils : UtilsService, private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('Calling fetchMovies...');
    this.movieService.fetchMovies()
      .then((movies: MovieModel[]) => {
        console.log('Movies fetched:', movies);
        this.movies = movies;
      })
      .catch((error: any) => {
        console.error('Error fetching movies:', error);
      });
  }

  getMovieRows(): MovieModel[][] {
    const rows: MovieModel[][] = [];
    for (let i = 0; i < this.movies.length; i += 4) {
      rows.push(this.movies.slice(i, i + 4)); // ✅ Group movies in chunks of 4
    }
    return rows;
  }
  
}
  
