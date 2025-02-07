import { DishCategory, DishType } from './interfaces';

export interface MenuOcrOutput {
  dishes: Dish[];
}

export interface Dish {
  name: string;
  type: DishType;
  price: number;
  category: DishCategory;
  ingredients: string[];
}
