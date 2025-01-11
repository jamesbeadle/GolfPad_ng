import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NavigationComponent {
  @Input() expanded = false;
  @Output() openNav = new EventEmitter<void>();

  handleOpenNav(): void {
    this.openNav.emit();
  }
}
