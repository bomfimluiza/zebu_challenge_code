export default class Ingredient {
  id: string;
  name: string;
  imgSrc: string;
  quantity: number;

  constructor({id, name, imgSrc, quantity}: Ingredient) {
    this.id = id;
    this.name = name;
    this.imgSrc = imgSrc;
    this.quantity = quantity;
  }
}