import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TheaterModel } from '../../models/theater.model';
import { TheaterService } from '../../services/theater.service';

@Component({
  selector: 'app-theater',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './theater.component.html',
  styleUrl: './theater.component.css',
  
  providers: [TheaterService] 
})
export class TheaterComponent {
  displayedColumns: string[] = ['id', 'name', 'location'];
  dataSource: TheaterModel[] = [];

  constructor(private theaterService: TheaterService) {} 

  ngOnInit() {
    this.dataSource = this.theaterService.getTheaters(); 
  }
}
