import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from "../../../../shared/simple-modal/simple-modal.component";
import { BrandTextComponent } from "../../../../shared/brand-text/brand-text.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pin-high',
  imports: [SimpleModalComponent, BrandTextComponent, CommonModule],
  templateUrl: './pin-high.component.html',
  styleUrl: './pin-high.component.css',
  standalone: true
})
export class PinHighComponent {

  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
}
