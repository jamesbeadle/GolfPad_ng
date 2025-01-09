import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bullseye',
  templateUrl: './bullseye.component.html',
  styleUrl: './bullseye.component.css',
  standalone: false
})
export class BullseyeComponent {

  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
}
