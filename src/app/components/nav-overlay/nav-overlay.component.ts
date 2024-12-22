import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../models/nav-item.model';

@Component({
  selector: 'app-nav-overlay',
  templateUrl: './nav-overlay.component.html',
  styleUrls: ['./nav-overlay.component.css'],
})
export class NavOverlayComponent implements OnInit {
  expanded: boolean = false;
  selectedRoute: string = 'home';
  toggleNav = new EventEmitter<void>();

  navItems: NavItem[] = [
    { name: 'HOME', route: 'home' },
    { name: 'WHITEPAPER', route: 'whitepaper' },
    // { name: 'GAME RULES', route: 'game-rules' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateSelectedRoute(this.router.url);
  }

  selectRoute(route: string): void {
    this.selectedRoute = route;
    this.toggleNav.emit();

    if (route === 'home') {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate([`/${route}`]);
  }

  closeNav(): void {
    this.toggleNav.emit();
  }

  goHome(): void {
    this.toggleNav.emit();
    this.router.navigate(['/']);
  }

  private updateSelectedRoute(path: string): void {
    switch (path) {
      case '/':
        this.selectedRoute = 'home';
        break;
      case '/whitepaper':
        this.selectedRoute = 'whitepaper';
        break;
      case '/game-rules':
        this.selectedRoute = 'game-rules';
        break;
      case '/games':
        this.selectedRoute = 'games';
        break;
      default:
        this.selectedRoute = 'home';
        break;
    }
  }
}
