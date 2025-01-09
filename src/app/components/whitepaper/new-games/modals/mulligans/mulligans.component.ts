import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mulligans',
  templateUrl: './mulligans.component.html',
  standalone: false
})
export class MulligansComponent {
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  images = [
    { src: 'whitepaper/mulligans1.jpg', alt: 'In-game view', nextLabel: 'Show Results View' },
    { src: 'whitepaper/mulligans2.jpg', alt: 'Results screen', nextLabel: 'Show In-game View' }
  ];

  currentImageIndex = 0;

  toggleImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
