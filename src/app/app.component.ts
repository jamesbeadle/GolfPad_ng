import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NaviationOverlayComponent } from './shared/naviation-overlay/naviation-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    NaviationOverlayComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  expanded = false;
  selectedRoute = 'home';
  isHomepage = false;

  ngOnInit(): void {
  }

  toggleNav(): void {
    console.log("here")
    this.expanded = !this.expanded;
  }

  logout(): void {
  }
}
