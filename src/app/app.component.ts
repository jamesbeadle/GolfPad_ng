import { Component, OnInit } from '@angular/core'
import { SupabaseService } from '../app/services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements OnInit {
  
  expanded = false;
  selectedRoute = 'home';
  isHomepage = false;
  isLoggedIn = false;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.isLoggedIn == !!session))
  }

  toggleNav(): void {
    this.expanded = !this.expanded;
  }

  logout(): void {
  }
}