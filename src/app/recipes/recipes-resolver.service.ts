/*import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipes } from './recipes.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({providedIn:'root'})

 export class RecipesResolverService implements Resolve<Recipes[]>{
    
    constructor(private ds:DataStorageService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.ds.fetchRecipes();
    }

} */