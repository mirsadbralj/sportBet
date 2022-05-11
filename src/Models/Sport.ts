import { Country } from './Country';
import { Orderable } from "./Orderable";


export class Sport extends Orderable {
  public id: number;
  public name: string;
  public countries = new Array<Country>();

  constructor(id: number, name: string, order: number, countries: Array<Country>) {
    super(order);
    this.id = id;
    this.name = name;
    this.countries = countries;
  }
}
