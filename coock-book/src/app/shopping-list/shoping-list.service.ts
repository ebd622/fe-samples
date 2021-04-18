import {Ingredient} from '../shared/ingredient.model';
import {Recipe} from '../recipes/recipe.model';
import {EventEmitter} from '@angular/core';

export class ShopingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 3)
  ];

  getIngrediants(){
    return this.ingredients.slice();
  }

  addIngredient(ingr: Ingredient){
    this.ingredients.push(ingr);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingrs: Ingredient []){
    this.ingredients.push(...ingrs); // "..." is a spread operator
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
