import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-naviation-overlay',
  templateUrl: './naviation-overlay.component.html',
  standalone: false
})
export class NaviationOverlayComponent {
  @Input() expanded = false;
  @Output() closeNav = new EventEmitter<void>();

  handleCloseNav(): void {
    this.closeNav.emit();
  }
}
