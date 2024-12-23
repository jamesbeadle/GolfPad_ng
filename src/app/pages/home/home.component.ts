import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) {
    // Observe user auth state  
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
