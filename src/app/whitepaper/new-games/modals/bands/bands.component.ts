import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrandTextComponent } from "../../../../shared/brand-text/brand-text.component";
import { SimpleModalComponent } from "../../../../shared/simple-modal/simple-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  imports: [BrandTextComponent, SimpleModalComponent, CommonModule],
  standalone: true,
})
export class BandsComponent {
  
  @Input() visible = false;

  @Output() closeModal = new EventEmitter<void>();
  
  images = [
    { src: 'whitepaper/bands1.jpg', alt: 'Prediction view', nextLabel: 'Show Live View' },
    { src: 'whitepaper/bands2.jpg', alt: 'Live view', nextLabel: 'Show Results View' },
    { src: 'whitepaper/bands3.jpg', alt: 'Results view', nextLabel: 'Show Prediction View' }
  ];

  currentImageIndex = 0;
  
  toggleImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
