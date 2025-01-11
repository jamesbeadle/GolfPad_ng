import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  isLoading = true;

  constructor(private authService: AuthService) {
    console.log(this.authService)
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }
}
