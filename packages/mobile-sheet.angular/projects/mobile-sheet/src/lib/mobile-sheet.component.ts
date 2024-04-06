import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Percent, Sheet } from '@royalzsoftware/mobile-sheet';

@Component({
  selector: 'lib-mobile-sheet',
  standalone: true,
  imports: [AsyncPipe],
  template: `
  Hallo welt
  {{(sheet.position$ | async)?.value}}
  <button (click)="chg()">
  Change to
  </button>
  <button (click)="sheet.dockToNearestPoint()">
  DOCK
  </button>
  `,
  styles: ``
})
export class MobileSheetComponent {
  public sheet: Sheet;

  public newPosition = new Percent(57);

  constructor() {
    this.sheet = new Sheet([new Percent(30), new Percent(70)]);
  }

  chg() {
    console.log(this.sheet);
    this.sheet.changePosition(this.newPosition)
  }
}
