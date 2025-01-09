import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-build-it',
  templateUrl: './build-it.component.html',
  standalone: false
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
