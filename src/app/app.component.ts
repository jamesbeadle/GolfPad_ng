import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NaviationOverlayComponent } from './shared/naviation-overlay/naviation-overlay.component';
import { MerveComponent } from "./components/merve/merve.component";
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GolfersService } from './services/golfer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    NaviationOverlayComponent,
    MerveComponent,
    ReactiveFormsModule
],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  expanded = false;
  selectedRoute = 'home';
  isHomepage = false;
  isLoggedIn = false;
  golfers: any[] = [];

  constructor(private authService: AuthService, private golferService: GolfersService) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.fetchGolfers();
    });
  }
  ngOnInit(){
  }


  async fetchGolfers(): Promise<void> {
    if (!this.isLoggedIn) {
      console.warn('User not logged in, cannot fetch golfers');
      return;
    }
    let golfers = await this.golferService.getGolfers();
  }

  toggleNav(): void {
    this.expanded = !this.expanded;
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
  }
}
