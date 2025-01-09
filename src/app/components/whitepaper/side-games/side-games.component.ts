import { Component } from '@angular/core';

@Component({
  selector: 'app-side-games',
  templateUrl: './side-games.component.html',
  styleUrl: './side-games.component.css',
  standalone: false
})
export class SideGamesComponent {
  showBombs = false;
  showPinHigh = false;
  showBullseye = false;

  openBombs() { this.showBombs = true; }
  closeBombs() {  this.showBombs = false; }

  openPinHigh() { this.showPinHigh = true; }
  closePinHigh() { this.showPinHigh = false; }

  openBullseye() { this.showBullseye = true; }
  closeBullseye() { this.showBullseye = false; }
}
