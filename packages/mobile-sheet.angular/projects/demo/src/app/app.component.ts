import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Percent } from '@royalzsoftware/mobile-sheet';
import { MobileSheetComponent, SheetConfiguration, SHEET_CONFIGURATION } from '../../../mobile-sheet/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MobileSheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{
    provide: SHEET_CONFIGURATION,
    useValue: {
      dockPoints: [new Percent(30), new Percent(60)],
    } as SheetConfiguration,
  }],
})
export class AppComponent {
  title = 'demo';
}
