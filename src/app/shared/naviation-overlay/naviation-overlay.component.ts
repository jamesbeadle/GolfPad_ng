import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-naviation-overlay',
  templateUrl: './naviation-overlay.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class NaviationOverlayComponent {
  @Input() expanded = false;
  @Output() closeNav = new EventEmitter<void>();

  isLoggedIn = false

  constructor(private authService: AuthService){
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  handleCloseNav(): void {
    this.closeNav.emit();
  }

  handleLogin(): void {
    this.authService.signInWithGoogle();
  }

  handleLogout() : void {
    this.authService.signOut();
  }
}
