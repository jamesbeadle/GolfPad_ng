import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bombs',
  templateUrl: './bombs.component.html',
  styleUrl: './bombs.component.css',
  standalone: false
})
export class BombsComponent {

  @Input() visible = false;
  
    @Output() closeModal = new EventEmitter<void>();
    onClose(): void {
      this.closeModal.emit();
    }
}
