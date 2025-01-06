import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from '../../../../shared/simple-modal/simple-modal.component';
import { BrandTextComponent } from '../../../../shared/brand-text/brand-text.component';

@Component({
  selector: 'app-bullseye',
  imports: [SimpleModalComponent, BrandTextComponent, CommonModule],
  templateUrl: './bullseye.component.html',
  styleUrl: './bullseye.component.css',
  standalone: true
})
export class BullseyeComponent {

  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();
  onClose(): void {
    this.closeModal.emit();
  }
}
