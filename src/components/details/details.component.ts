import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, NgFor, NgIf, MatListModule, RouterLink],
  providers: [MovieService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  movie: MovieModel | null = null;  // Initialize as null

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService, 
    public utils: UtilsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = +params['id']; 
      console.log('Fetching movie with ID:', movieId);
  
      this.movieService.getMovieById(movieId)
        .then(rsp => {
          console.log('API Response:', rsp);
          this.movie = rsp; 
  
          console.log('Genres:', this.movie?.movieGenres);
        })
        .catch(error => {
          console.error('Error fetching movie:', error);
        });
    });
  }
}
