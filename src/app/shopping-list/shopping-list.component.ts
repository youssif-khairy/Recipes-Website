import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredient[];
  private subIngredient:Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.subIngredient = this.shoppingListService.addNewIngredient.subscribe(
      (listOfIngredient:Ingredient[])=> {this.ingredients = listOfIngredient}
    )
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }


  ngOnDestroy(){
    this.subIngredient.unsubscribe();
  }
}
