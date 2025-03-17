import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { OrderModel } from '../../models/order.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TheaterService } from '../../services/theater.service';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-user',
  providers: [UserService, TheaterService, MovieService],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatAccordion,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  public displayedColumns: string[] = ['id', 'movie', 'theater', 'count', 'price', 'total', 'status', 'rating', 'actions'];
  public user: UserModel | null = null;
  public movie: MovieModel | null = null;

  public oldPasswordValue = '';
  public newPasswordValue = '';
  public repeatPasswordValue = '';

  constructor(private router: Router, private userService: UserService, private theaterService: TheaterService, private movieService: MovieService) {
    this.loadUser();
  }

  getTheaterName(theaterId: number): string {
    const theater = this.theaterService.getTheaterById(theaterId);
    return theater ? theater.name : 'Unknown Theater';
  }


  private loadUser(): void {
    const activeUser = this.userService.getActiveUser();
    if (!activeUser) {
      this.router.navigate(['/home']);
      return;
    }
    this.user = activeUser;
  }

  public doChangePassword(): void {
    if (!this.oldPasswordValue || !this.newPasswordValue) {
      alert('Password can\'t be empty');
      return;
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Passwords don\'t match');
      return;
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Incorrect current password');
      return;
    }

    const success = this.userService.changePassword(this.newPasswordValue);
    alert(success ? 'Password has been changed' : 'Failed to change password');

    this.oldPasswordValue = '';
    this.newPasswordValue = '';
    this.repeatPasswordValue = '';
  }

  public doPay(order: OrderModel): void {
    if (this.userService.changeOrderStatus('plaćeno', order.id)) {
      this.loadUser();
    }
  }

  public doCancel(order: OrderModel): void {
    if (this.userService.changeOrderStatus('otkazano', order.id)) {
      this.loadUser();
    }
  }

  public doRating(order: OrderModel, rating: boolean): void {
    if (this.userService.changeRating(rating, order.id)) {
      this.loadUser(); 
    } 
    else {console.warn(`Failed to update rating for order ${order.id}`);}
  }
  
}
