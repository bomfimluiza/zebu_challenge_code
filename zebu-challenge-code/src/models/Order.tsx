import Size from './Size';
import Crust from './Crust';
import Ingredient from './Ingredient';

export default class Order {
  id: string;
  size: Size;
  crust: Crust;
  ingredients: Ingredient[];
  total: number;

  constructor({id, size, crust, ingredients, total}: Order) {
    this.id = id;
    this.size = size;
    this.crust = crust;
    this.ingredients = ingredients;
    this.total = total;
  }
}