import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from "../../../../shared/simple-modal/simple-modal.component";
import { BrandTextComponent } from "../../../../shared/brand-text/brand-text.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next-up',
  templateUrl: './next-up.component.html',
  imports: [SimpleModalComponent, BrandTextComponent, CommonModule],
  standalone: true,
})
export class NextUpComponent {
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  images = [
    { src: 'whitepaper/next-up1.jpg', alt: 'Live View', nextLabel: 'Show Results View' },
    { src: 'whitepaper/next-up2.jpg', alt: 'Results screen', nextLabel: 'Show Live View' }
  ];

  currentImageIndex = 0;

  toggleImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
