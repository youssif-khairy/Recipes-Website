import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, exhaustMap } from 'rxjs/operators'

import { Recipes } from '../recipes/recipes.model'
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private URL = 'https://chatapp-c3ec9.firebaseio.com/recipes.json';
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.authService.user.subscribe(user => {
            this.http.post(this.URL,recipes,{params:new HttpParams().set('auth',user.token)},).
            subscribe(response => {
                    console.log(response);
                });
        })
        
    }
    fetchRecipes() {
        this.authService.user.subscribe(user => {
            this.http.get<{}>(this.URL,{params:new HttpParams().set('auth',user.token)})
                .subscribe(recipes => {
                    console.log(recipes[Object.keys(recipes)[Object.keys(recipes).length-1]])
                    this.recipeService.setRecipes(recipes[Object.keys(recipes)[Object.keys(recipes).length-1]])
                })
        })

    }

}