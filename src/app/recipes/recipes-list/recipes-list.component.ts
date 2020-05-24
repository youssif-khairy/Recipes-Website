import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Recipes} from '../recipes.model'
import { RecipeService } from '../recipe.service';
import { Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes:Recipes[];
  constructor(private recipeService:RecipeService,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipes[])=>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  
}
