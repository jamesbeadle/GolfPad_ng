import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NaviationOverlayComponent } from './shared/naviation-overlay/naviation-overlay.component';
import { MerveComponent } from "./components/merve/merve.component";
import { AuthService } from './services/auth.service';
import { GolfersService } from './services/golfers.service';

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
  golfers: any[] = [];

  constructor(private authService: AuthService, private golfersService: GolfersService) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        //this.fetchGolfers();
      }
    });
  }
  ngOnInit(){
  }


  async fetchGolfers(): Promise<void> {
    if (!this.isLoggedIn) {
      console.warn('User not logged in, cannot fetch golfers');
      return;
    }
    try {
      this.golfers = await this.golfersService.getGolfers();
    } catch (err) {
      console.error('Error getting golfers:', err);
    }
  }

  toggleNav(): void {
    console.log("here")
    this.expanded = !this.expanded;
  }

  logout(): void {
  }
}
