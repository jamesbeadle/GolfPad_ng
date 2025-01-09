import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  standalone: false
})
export class NavigationComponent {
  @Input() expanded = false;
  @Output() openNav = new EventEmitter<void>();

  handleOpenNav(): void {
    console.log("emit")
    this.openNav.emit();
  }
}
