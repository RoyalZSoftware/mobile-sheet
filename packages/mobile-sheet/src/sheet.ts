import { Percent } from "./percent";
import { BehaviorSubject } from 'rxjs';

export class Sheet {
    private static Collapsed = Percent.Zero;

    public position$: BehaviorSubject<Percent>;

    constructor(
        public dockPoints: Percent[]
    ) {
        this.position$ = new BehaviorSubject<Percent>(Sheet.Collapsed);
    }

    public collapse() {
        this.changePosition(Sheet.Collapsed);
    }

    public changePosition(percent: Percent) {
        this.position$.next(percent);
    }

    public dockToNearestPoint() {
        this.position$.next(this._findNearestDockPoint());
    }

    private _findNearestDockPoint() {
        const possibleDockPoints = [Percent.Zero, ...this.dockPoints];

        const sheetPosition = this.position$.value;

        let smallestDistance = 100;
        let nearestDockPoint = undefined;
        for (const dockPoint of possibleDockPoints) {
            let distance = Math.abs(sheetPosition.minus(dockPoint).value);
            if (distance == smallestDistance) {
                distance -= 0.5;
            }
            if (distance < smallestDistance) {
                nearestDockPoint = dockPoint;
                smallestDistance = distance;
            }
        }

        return nearestDockPoint ?? Percent.Zero;
    }
}
