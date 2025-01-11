import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-text',
  template: `
    <span class="font-bold text-black condensed">
      {{ content }}
    </span>
  `
})
export class BrandTextComponent {
  @Input() content = '';
}
