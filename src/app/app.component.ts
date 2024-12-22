import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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


  logout(): void {
    console.log('logout');
  }
}