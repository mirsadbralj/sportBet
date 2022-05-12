export class Odds {
    alias: string;
    description: string;
    field: string;
    marketId: number;
    order: number;
    value?: string;

    constructor(alias: string, desciption: string, field: string, marketId: number, order: number, value?: string) {
        this.alias = alias;
        this.description = desciption;
        this.field = field;
        this.marketId = marketId;
        this.order = order;
        this.value = value;
    }
}
