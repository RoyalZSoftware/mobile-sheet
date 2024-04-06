import { Percent } from "./percent";
import { Sheet } from "./sheet";

describe("Sheet", () => {
    it("Initial height is collapsed", () => {
        const sheet = new Sheet([]);
        expect(sheet.position$.value.value).toEqual(0);
    });

    it("Sheet change size changes the size", () => {
        const sheet = new Sheet([]);
        
        const updatedPosition = new Percent(40);

        sheet.changePosition(updatedPosition);

        expect(sheet.position$.value).toEqual(updatedPosition);
    })

    it("Sheet docks to collapsed state if nothing is given", () => {
        const sheet = new Sheet([]);
        sheet.changePosition(Percent.Hundred);
        
        expect(sheet.position$.value).toEqual(new Percent(100));
        sheet.dockToNearestPoint();

        expect(sheet.position$.value).toEqual(new Percent(0));
    })

    it("Sheet docks to collapsed state if another dock point is given, but it is farer away", () => {
        const sheet = new Sheet([new Percent(80)]);

        sheet.changePosition(new Percent(39));

        sheet.dockToNearestPoint()

        expect(sheet.position$.value).toEqual(Percent.Zero);
    })

    it("Sheet docks to first dock point when calling dockToNearestDockPoint", () => {
        const sheet = new Sheet([new Percent(80)]);

        sheet.changePosition(new Percent(70));

        sheet.dockToNearestPoint()

        expect(sheet.position$.value).toEqual(new Percent(80));
    })

    it("Sheet moves to rather the higher value than the lower when distance between two dock points is equal", () => {
        const sheet = new Sheet([new Percent(30), new Percent(60)]);

        sheet.changePosition(new Percent(45));

        sheet.dockToNearestPoint();

        expect(sheet.position$.value).toEqual(new Percent(60));
    })
});