import { Component } from '@angular/core';

@Component({
  selector: 'app-new-games',
  templateUrl: './new-games.component.html',
  styleUrl: './new-games.component.css',
  standalone: false
})
export class NewGamesComponent {
  showMulligans = false;
  showBands = false;
  showBuildIt = false;
  showNextUp = false;

  openMulligans() { this.showMulligans = true; }
  closeMulligans() { 
    this.showMulligans = false; 
  }

  openBands() { this.showBands = true; }
  closeBands() { this.showBands = false; }

  openBuildIt() { this.showBuildIt = true; }
  closeBuildIt() { this.showBuildIt = false; }

  openNextUp() { this.showNextUp = true; }
  closeNextUp() { this.showNextUp = false; }
}
