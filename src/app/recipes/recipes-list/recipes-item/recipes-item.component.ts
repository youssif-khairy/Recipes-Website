import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Recipes} from '../../recipes.model'

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss']
})
export class RecipesItemComponent implements OnInit {
@Input('recipeItem') recipe:Recipes;
@Input() index:number;
  constructor() { }

  ngOnInit(): void {
  }

  

}
