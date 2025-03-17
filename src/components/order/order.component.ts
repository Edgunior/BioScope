import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterModel } from '../../models/theater.model';
import { TheaterService } from '../../services/theater.service';
import { UserService } from '../../services/user.service';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCardModule, MatInputModule, MatButtonModule, 
    MatSelectModule, MatFormFieldModule, FormsModule, NgIf, NgFor,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  public theaters: TheaterModel[] = [];
  public movies: MovieModel[] = [];
  public selectedMovie: MovieModel | null = null;
  public selectedMovieId: number | null = null;
  public selectedTheaterId: number | null = null;
  public selectedTicketCount: number = 1;
  public selectedPrice: number = 150;

  constructor(
    public utils: UtilsService,
    private route: ActivatedRoute,
    private theaterService: TheaterService,
    private userService: UserService,
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // ✅ Get movie ID from URL
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.selectedMovieId = Number(movieId);
      console.log('Movie ID from route:', this.selectedMovieId);
    }

    this.loadTheaters();
    this.loadMovies();
  }

  get selectedTheater(): TheaterModel | null {
    return this.theaters.find(theater => theater.id === this.selectedTheaterId) || null;
  }

  /** Load theaters and set default selection */
  private loadTheaters(): void {
    this.theaters = this.theaterService.getTheaters();
    if (this.theaters.length > 0) {
      this.selectedTheaterId = this.theaters[0].id;
    }
    console.log("Theaters Loaded:", this.theaters); 
  }

  /** Load movies and find the correct one based on ID */
  private async loadMovies(): Promise<void> {
    try {
      const movies = await this.movieService.getMovies();
      console.log('Movies fetched:', movies);
  
      if (movies.length > 0) {
        this.movies = movies;
        
        // ✅ Use correct property name
        console.log('Available movie IDs:', this.movies.map(m => m.movieId)); 
  
        if (this.selectedMovieId) {
          this.selectedMovie = this.movies.find(m => Number(m.movieId) === this.selectedMovieId) || null;
        }
  
        if (!this.selectedMovie) {
          console.error('Movie not found with ID:', this.selectedMovieId);
        } else {
          console.log('Selected movie:', this.selectedMovie);
        }
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
    }
  }
  
  

  /** Handle order submission */
  public doOrder(): void {
    if (!this.selectedMovie || !this.selectedTheaterId) {
      console.error('Movie or theater not selected!');
      return;
    }

    const order = {
      id: new Date().getTime(),
      movieId: this.selectedMovie.id,
      title: this.selectedMovie.title,
      location: this.selectedTheater?.location || 'N/A', 
      theaterId: this.selectedTheaterId, 
      count: this.selectedTicketCount,
      pricePerItem: this.selectedPrice,
      status: 'ordered',
      rating: null,
      shortDescription: `Order for ${this.selectedMovie.title}`,
      destination: 'Online Purchase'
    };
    
    try {
      const result = this.userService.createOrder(order);
      if (result) {
        console.log('Order placed successfully!');
        this.router.navigate(['/home']); 
      } else {
        console.log('Order failed!');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  }
}
