import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from "../../../../shared/simple-modal/simple-modal.component";
import { BrandTextComponent } from "../../../../shared/brand-text/brand-text.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-build-it',
  templateUrl: './build-it.component.html',
  imports: [SimpleModalComponent, BrandTextComponent, CommonModule],
  standalone: true
})
export class BuildItComponent {
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  images = [
    { src: 'whitepaper/build-it1.jpg', alt: 'Team Creation View', nextLabel: 'Show Results View' },
    { src: 'whitepaper/build-it2.jpg', alt: 'Results screen', nextLabel: 'Show Team View' }
  ];

  currentImageIndex = 0;

  toggleImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
