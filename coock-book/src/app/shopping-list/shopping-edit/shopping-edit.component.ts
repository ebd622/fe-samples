import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShopingListService} from '../shoping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  /* nameInput and amountInput are local references */
  @ViewChild('nameInput', {static: false})nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false})amountInputRef: ElementRef;

  constructor(private shopingListService: ShopingListService) { }

  ngOnInit(): void {
  }

  onAddButton(){
    const name = this.nameInputRef.nativeElement.value;
    const amount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.shopingListService.addIngredient(newIngredient);
  }
}
