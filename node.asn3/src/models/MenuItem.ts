export class MenuItem {
  price: string;
  name: string;
  category: string;

  constructor( name: string, price: string, category: string) {
    this.price = price;
    this.name = name;
    this.category = category;
  }
}