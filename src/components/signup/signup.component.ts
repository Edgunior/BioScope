import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatCardModule, MatButtonModule],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';

  constructor(private userService: UserService, private router: Router) {}

  public doSignup() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Email and password are required fields');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords don\'t match');
      return;
    }

    const newUser: UserModel = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      orders: []
    };

    const result = this.userService.createUser(newUser);
    
    if (result) {
      this.router.navigate(['/login']);
    } else {
      alert('Email is already taken');
    }
  }
}
