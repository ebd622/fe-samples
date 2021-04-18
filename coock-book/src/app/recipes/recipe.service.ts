import {Recipe} from './recipe.model';

export class RecipeService{
  private recepies: Recipe[]  = [
    new Recipe('A test name 1', 'This is a test 1 ', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg'),
    new Recipe('A test name 2' , 'This is a test 2', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg')
  ];

  getRecipes(){
    return this.recepies.slice(); //this will return not a refference to "recipes" but a copy of the array
  }
}
