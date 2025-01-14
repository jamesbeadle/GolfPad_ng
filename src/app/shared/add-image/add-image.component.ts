import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleModalComponent } from '../simple-modal/simple-modal.component';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [CommonModule, SimpleModalComponent],
  template: `
    <app-simple-modal
      [title]="'EDIT PROFILE PICTURE'"
      [showModal]="true"
      (onClose)="close.emit()"
    >
      <div 
        class="drop-zone"
        [class.dragging]="isDragging"
        (dragover)="onDragOver($event)"
        (dragleave)="isDragging = false"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
      >
        <ng-container *ngIf="!previewUrl">
          <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.125 22.3125C13.125 20.139 14.889 18.375 17.0625 18.375C19.236 18.375 21 20.139 21 22.3125C21 24.4886 19.236 26.25 17.0625 26.25C14.889 26.25 13.125 24.4886 13.125 22.3125ZM36.75 23.625L30.1376 34.125L23.625 28.98L13.125 44.625H49.875L36.75 23.625ZM57.75 13.125V49.875H5.25V13.125H57.75ZM63 7.875H0V55.125H63V7.875Z" fill="#313235"/>
          </svg>
          <p>DRAG AND DROP OR BROWSE</p>
        </ng-container>
        <img 
          *ngIf="previewUrl" 
          [src]="previewUrl" 
          class="preview-image" 
          alt="Preview"
        >
        <input 
          type="file" 
          #fileInput
          (change)="onFileSelected($event)" 
          accept="image/*"
          class="hidden"
        >
      </div>

      <div class="modal-footer mx-6 mb-6">
        <button 
          class="brand-button" 
          (click)="close.emit()"
        >
          CANCEL
        </button>
        <button 
          [class]="selectedFile ? 'brand-button-save' : 'brand-button-inactive'"
          [disabled]="!selectedFile" 
          (click)="handleSave()"
        >
          SAVE
        </button>
      </div>
    </app-simple-modal>
  `,
})
export class AddImageComponent {
  @Output() fileSelect = new EventEmitter<{file: File, preview: string}>();
  @Output() close = new EventEmitter<void>();

  isDragging = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private async handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    this.selectedFile = file;
    this.previewUrl = await this.getPreviewUrl(file);
  }

  private getPreviewUrl(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  handleSave() {
    if (this.selectedFile && this.previewUrl) {
      this.fileSelect.emit({ file: this.selectedFile, preview: this.previewUrl });
      this.close.emit();
    }
  }
}