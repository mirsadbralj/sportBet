import { League } from './League';
import { Orderable } from "./Orderable";


export class Country extends Orderable {
  public name: string;
  public leagues = new Array<League>();

  constructor(name: string, order: number, leagues: Array<League>) {
    super(order);
    this.name = name;
    this.order = order;
    this.leagues = leagues;
  }
}
