import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelected = new  EventEmitter<Recipe>();
  recepies: Recipe[]  = [
    new Recipe('A test name 1', 'This is a test 1 ', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg'),
    new Recipe('A test name 2' , 'This is a test 2', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(rcp: Recipe){
    this.recipeWasSelected.emit(rcp);

  }
}
