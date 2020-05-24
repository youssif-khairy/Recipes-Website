import { Component, OnInit, Output, EventEmitter, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index)
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  onSubmitItem(form: NgForm){
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.udateIngredient(this.editedItemIndex,new Ingredient(value.name,+value.amount))
    }else{
    this.shoppingListService.addIngredient(new Ingredient(value.name,+value.amount))
    }
    this.editMode = false;
    this.slForm.reset();
  } 
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
