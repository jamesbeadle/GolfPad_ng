import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NaviationOverlayComponent } from './shared/naviation-overlay/naviation-overlay.component';
import { MerveComponent } from "./components/merve/merve.component";
import { SupabaseService } from './services/supabase.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    NaviationOverlayComponent,
    MerveComponent
],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  expanded = false;
  selectedRoute = 'home';
  isHomepage = false;
  isLoggedIn = false;

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.authChanges((_, session) => (this.isLoggedIn == !!session))
  }
  ngOnInit(){}

  toggleNav(): void {
    console.log("here")
    this.expanded = !this.expanded;
  }

  logout(): void {
  }
}
