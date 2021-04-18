import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  private recepies: Recipe[]  = [
    new Recipe(
      'A test name 1',
      'This is a test 1 ',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'A test name 2' ,
      'This is a test 2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('French Fries1', 20)
      ])
  ];

  getRecipes(){
    return this.recepies.slice(); //this will return not a refference to "recipes" but a copy of the array
  }
}
