import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public constructor(public userService: UserService, private router: Router) {} // ✅ Injecting UserService properly

  public doLogout() {
    localStorage.removeItem('active');
    this.router.navigate(['/login']);
  }
}
