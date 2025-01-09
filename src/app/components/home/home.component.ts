import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.authChanges((_, session) => {
      this.isLoggedIn = !!session;
    });
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
