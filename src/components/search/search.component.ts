import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    NgFor,
    NgIf,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['movieId', 'title', 'location', 'theater', 'createdAt', 'actions'];
  allData: MovieModel[] | null = null;
  locationList: string[] = [];
  titleList: string[] = [];
  theaterList: string[] = [];
  selectedTheater: string | null = null;
  dataSource: MovieModel[] | null = null;
  selectedLocation: string | null = null;
  userInput: string = '';
  dateOptions: string[] = [];
  selectedDate: string | null = null;
  selectedTitle: string | null = null;

  constructor(public utils: UtilsService, private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.movieService.getMovies()
      .then((movies: MovieModel[]) => {
        this.allData = movies;
        this.dataSource = movies;
        this.generateSearchCriteria(movies);
      })
      .catch(error => {
        console.error('Failed to fetch movies:', error);
      });
  }

  private generateSearchCriteria(source: MovieModel[]): void {
    this.locationList = [...new Set(source.map(obj => obj.theater.location))];
    this.titleList = [...new Set(source.map(obj => obj.title))];
    this.dateOptions = [...new Set(source.map(obj => obj.createdAt.split('T')[0]))];
  }

  public doReset(): void {
    this.userInput = '';
    this.selectedTitle = null;
    this.selectedTheater = null;
    this.selectedLocation = null;
    this.selectedDate = null;
    this.dataSource = this.allData ? [...this.allData] : null;
    if (this.allData) {
      this.generateSearchCriteria(this.allData);
    }
  }

  public doFilterChain(): void {
    if (!this.allData) return;

    this.dataSource = this.allData.filter(obj => {
      return (!this.userInput || obj.theater.location.toLowerCase().includes(this.userInput) || 
              obj.id.toString().includes(this.userInput) || obj.title.includes(this.userInput)) &&
             (!this.selectedLocation || obj.theater.location === this.selectedLocation) &&
             (!this.selectedTitle || obj.title === this.selectedTitle) &&
             (!this.selectedDate || this.isDateInRange(obj.createdAt, this.selectedDate));
    });

    this.generateSearchCriteria(this.dataSource);
  }

  private isDateInRange(createdAt: string, selectedDate: string): boolean {
    const start = new Date(`${selectedDate}T00:00:01`);
    const end = new Date(`${selectedDate}T23:59:59`);
    const scheduled = new Date(createdAt);
    return start <= scheduled && scheduled <= end;
  }
}
