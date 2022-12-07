import { Country } from './Country';
import { Orderable } from "./Orderable";


export class Sport extends Orderable {
  public id: number;
  public name: string;
  public countries = new Array<Country>();
  public expanded:boolean = false;
  constructor(id: number, name: string, order: number, countries: Array<Country>, expanded:boolean) {
    super(order);
    this.id = id;
    this.name = name;
    this.countries = countries;
    this.expanded = expanded;
  }
}
