export default class Crust {
  id: string;
  name: string;
  price: number;
  imageSrc: string;

  constructor({id, name, price, imageSrc}: Crust) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
  }
}