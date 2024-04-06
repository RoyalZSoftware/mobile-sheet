import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileSheetComponent } from '../../../mobile-sheet/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MobileSheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';
}
