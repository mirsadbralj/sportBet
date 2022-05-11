import { Orderable } from "./Orderable";


export class League extends Orderable {
  public id: number;
  public name: string;

  constructor(id: number, name: string, order: number) {
    super(order);
    this.id = id;
    this.name = name;
    this.order = order;
  }
}
