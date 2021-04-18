import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShopingListService} from './shoping-list.service';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shopingListService: ShopingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopingListService.getIngrediants();
    this.shopingListService.ingredientAdded.subscribe(
      (ingrs : Ingredient[]) =>{
        this.ingredients = ingrs;
      }
    );
  }

}
