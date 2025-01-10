import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-naviation-overlay',
  templateUrl: './naviation-overlay.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
})
export class NaviationOverlayComponent {
  @Input() expanded = false;
  @Output() closeNav = new EventEmitter<void>();

  handleCloseNav(): void {
    this.closeNav.emit();
  }
}
