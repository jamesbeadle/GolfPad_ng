import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SimpleModalComponent {
  @Input() title = '';
  @Input() showModal = false;
  @Output() onClose = new EventEmitter<void>();

  closeModal(): void {
    this.onClose.emit();
  }
}
