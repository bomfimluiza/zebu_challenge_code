export default class Size {
  id: string;
  name: string;
  price: number;
  maxToppings: number;

  constructor({id, name, price, maxToppings}: Size) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.maxToppings = maxToppings;
  }
}