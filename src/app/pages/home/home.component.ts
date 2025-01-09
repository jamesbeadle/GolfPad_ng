import { Component, OnInit } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.authChanges((_, session) => (this.isLoggedIn == !!session))
  }

  async googleSignIn() {
    try {
      await this.supabase.signIn();
    } catch (error) {
      console.error('Google Sign-In error: ', error);
    }
  }


  ngOnInit() {
 
  }
}
