import { DishCategory, DishType } from './interfaces';

export interface MenuEnvironmentalImpactOutput {
  dishes: Dish[];
  environmental_score: number;
}

interface Dish {
  name: string;
  type: DishType;
  price: number;
  category: DishCategory;
  ingredients: Ingredient[];
}

interface Ingredient {
  ingredient: string;
  proportion: number;
}
