import { Component } from '@angular/core';
import { BombsComponent } from "./modals/bombs/bombs.component";
import { BrandTextComponent } from "../../shared/brand-text/brand-text.component";
import { PinHighComponent } from "./modals/pin-high/pin-high.component";
import { BullseyeComponent } from "./modals/bullseye/bullseye.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-games',
  imports: [BombsComponent, BrandTextComponent, PinHighComponent, BullseyeComponent, CommonModule],
  standalone: true,
  templateUrl: './side-games.component.html',
  styleUrl: './side-games.component.css'
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
