import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true, // If using standalone components
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private userService: UserService) { // ✅ Injected properly
    if (this.userService.getActiveUser()) { // ✅ Correct way to access the method
      this.router.navigate(['/user']);
    }
  }

  public doLogin() {
    if (this.userService.login(this.email, this.password)) { // ✅ Correct access to the method
      this.router.navigate(['/user']);
      return;
    }

    alert('Bad email or password');
  }
}
