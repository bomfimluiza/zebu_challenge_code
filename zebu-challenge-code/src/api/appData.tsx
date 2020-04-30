import axios from 'axios';
import Ingredient from '../models/Ingredient';
import Order from '../models/Order';

const baseUrl = 'https://zebu-pizza.firebaseio.com/data/-M67j6WSOKaawvDU1QbA';

export async function getInfo() {
  try {
    let response = await axios.get(baseUrl + '.json')
    response.data.ingredients.forEach((ingredient: any, index: number) => {
      response.data.ingredients[index] = {...ingredient, quantity: 0}
      response.data.ingredients[index] = new Ingredient(response.data.ingredients[index]);
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function updateInfo(orders: Order[]) {
  try {
    return await axios.put(baseUrl + '/orders.json', orders);
  } catch (error) {
    console.log(error);
    return null;
  }
};
