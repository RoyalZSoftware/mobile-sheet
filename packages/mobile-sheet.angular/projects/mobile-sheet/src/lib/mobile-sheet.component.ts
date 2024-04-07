import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  InjectionToken,
  ViewEncapsulation,
} from '@angular/core';
import { Percent, Sheet } from '@royalzsoftware/mobile-sheet';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

export interface SheetConfiguration {
  dockPoints: Percent[];
  transitionSpeed?: number;
}

export const SHEET_CONFIGURATION = new InjectionToken<SheetConfiguration>('SHEET_CONFIGURATION');

@Component({
  selector: 'mobile-sheet',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div
      id="sheet"
      [style.transform]="this.sheetTransformProperty | async"
      [style.transition]="(dragging$ | async) ? 'unset' : transitionSpeed + 's all'"
      [style.height]="'calc(100vh - ' + this.handle?.nativeElement?.clientHeight + ')'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: `
  #sheet {
    background-color: red;
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    transition: 0.2s all;
  }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MobileSheetComponent implements AfterViewInit {
  @ContentChild('handle') handle?: ElementRef<HTMLElement>;

  public sheet: Sheet;

  protected dragging$ = new ReplaySubject<boolean>(1);

  protected sheetTransformProperty: Observable<string>;
  protected transitionSpeed: number = 0.2;

  constructor(@Inject(SHEET_CONFIGURATION) sheetConfiguration: SheetConfiguration) {
    this.sheet = new Sheet(sheetConfiguration.dockPoints);
    if (sheetConfiguration.transitionSpeed)
      this.transitionSpeed = sheetConfiguration.transitionSpeed;
    this.sheetTransformProperty = this.sheet.position$.pipe(
      map((position: Percent) => {
        const invertedShare = new Percent(100 - position.asPercent());

        if (invertedShare.value === 0) {
          return `translateY(0%)`
        }

        return `translateY(calc(${invertedShare} - ${
          this.handle?.nativeElement?.clientHeight ?? 0
        }px))`;
      })
    );
  }

  ngAfterViewInit(): void {
    if (!this.handle) {
      throw new Error(
        'Handle not present. Define one by adding a contentChild with the identifier: #handle'
      );
    }
    this.handle!.nativeElement.addEventListener('touchstart', () => {
      this.dragging$.next(true);
    });
    this.handle!.nativeElement.addEventListener(
      'touchmove',
      (touchEvent: TouchEvent) => {
        const touchY = touchEvent.touches?.[0] ?? touchEvent.touches;

        const positionViewShare = new Percent(
          100 - (touchY.pageY / window.innerHeight) * 100
        );

        if (positionViewShare.value < 0 || positionViewShare.value > 1) return;

        this.sheet.position$.next(positionViewShare);
      }
    );
    this.handle!.nativeElement.addEventListener('touchend', () => {
      this.dragging$.next(false);
      this.sheet.dockToNearestPoint();
    });
  }
}
