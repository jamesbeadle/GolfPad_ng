import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { first, map, Observable } from 'rxjs';
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

  constructor(private authService: AuthService) {
    this.authService.$profile.pipe(
      first(),
      map(profile => {

        this.isLoggedIn = !!profile;
      }))
  }

  async googleSignIn() {
    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Google Sign-In error: ', error);
    }
  }


  ngOnInit() {
 
  }
}
