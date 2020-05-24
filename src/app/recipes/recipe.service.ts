import { Recipes } from './recipes.model';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService implements OnInit{
   recipesChanged = new Subject<Recipes[]>();
     private recipes:Recipes[] = [
        new Recipes('Test recipe'
        ,'test',
        'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('Fries',3),
        ]),
        new Recipes('Another Test recipe',
        'another test',
        'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
        [
            new Ingredient('Meat',1),
            new Ingredient('Meat',3),
        ]),
      ];  
      //private recipes:Recipes[] = [];
      constructor(private slService:ShoppingListService){}

      ngOnInit(){

      }
      setRecipes(r:Recipes[]){
        this.recipes = r;
        this.recipesChanged.next(this.recipes.slice())
      }
      getRecipes (){
          
          return this.recipes.slice();//deep copy
          
      }
      getRecipeById(id:number){
          return this.recipes[id];
      }
      addIngredientsToShoppingList(ingredients:Ingredient[]){
          for(let i of ingredients){
              this.slService.addIngredient(i);
          }
      }
      addRecipe(recipe:Recipes){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
      }
    updateRecipe(index:number,recipe:Recipes){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice())
    }


}