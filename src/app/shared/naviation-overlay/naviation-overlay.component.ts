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

  constructor(private authService: AuthService){

  }

  handleCloseNav(): void {
    this.closeNav.emit();
  }

  handleLogout() : void {
    this.authService.signOut();
  }
}
