import { DishCategory, DishType } from './interfaces';

export interface MenuRecipeOutput {
  dishes: Dish[];
}

interface Dish {
  name: string;
  type: DishType;
  price: number;
  category: DishCategory;
  ingredients: Ingredient[];
}

export interface Ingredient {
  ingredient: string;
  proportion: number;
}
