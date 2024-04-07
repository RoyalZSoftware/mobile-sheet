export class Percent {
    
    static Zero = new Percent(0);
    static Hundred = new Percent(100);

    public readonly value: number;
    constructor(_percentValue: number) {
        this.value = _percentValue / 100;
    }

    public asPercent() {
        return this.value * 100;
    }

    public toString(): string {
        return (this.value * 100) + "%";
    }

    public minus(percent: Percent) {
        return new Percent(this.asPercent() - percent.asPercent());
    }
}