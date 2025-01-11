import { Component } from '@angular/core';
import { BrandTextComponent } from "../../shared/brand-text/brand-text.component";

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  imports: [BrandTextComponent]
})
export class VisionComponent {
  ngOnInit() {
  }
}
