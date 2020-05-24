import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss']
})
export class RecipesDetailsComponent implements OnInit {
  recipe:Recipes;
  id:number;
  constructor(private recipeService:RecipeService,
              private aRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe((data:Params)=>{
      this.id = +data['id']
      this.recipe = this.recipeService.getRecipeById(this.id)
    })
    
  }
  addIngredientsToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
