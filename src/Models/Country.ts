import { EMPTY } from 'rxjs';
import { League } from './League';
import { Orderable } from "./Orderable";


export class Country extends Orderable {
  public name: string;
  public leagues = new Array<League>();
  public expanded?:boolean;

  constructor(name: string, order: number, leagues: Array<League>, expanded?:boolean) {
    super(order);
    this.name = name;
    this.order = order;
    this.leagues = leagues;
    this.expanded = expanded;
  }
}
