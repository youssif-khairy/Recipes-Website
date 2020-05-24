import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
    addNewIngredient = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients:Ingredient[] = [
        new Ingredient('Mobile',5),
        new Ingredient('TV',10),
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      udateIngredient(index:number,ing:Ingredient){
          this.ingredients[index] = ing;
          this.addNewIngredient.next(this.ingredients.slice())
      }
      addIngredient(ing:Ingredient){
          this.ingredients.push(ing);
          this.addNewIngredient.next(this.ingredients.slice());
      }
      getIngredient(index:number){
          return this.ingredients.slice()[index];
      }
      deleteIngredient(index:number){
          this.ingredients.splice(index,1)
          this.addNewIngredient.next(this.ingredients.slice());
      }
}