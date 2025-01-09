import { Component } from '@angular/core';

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  standalone: false
})
export class WhitepaperComponent {
  activeTab: string = 'vision';

  constructor() {}
}
