import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pin-high',
  templateUrl: './pin-high.component.html',
  styleUrl: './pin-high.component.css',
  standalone: false
})
export class PinHighComponent {

  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
}
