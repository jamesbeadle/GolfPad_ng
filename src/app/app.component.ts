import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  expanded = false;
  selectedRoute = 'home';
  isHomepage = false;

  ngOnInit(): void {
    
  }

  toggleNav() {
    this.expanded = !this.expanded;
  }

  http = inject(HttpClient);

  logout(): void {
    console.log('logout');
  }
}