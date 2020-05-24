import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy,OnInit {
    private userSub:Subscription;
    isAuthenticated = false;
    constructor(private ds: DataStorageService,
        private authService:AuthService,
        private router:Router) { }
    
    ngOnInit(){
        this.userSub = this.authService.user.
        subscribe(user =>{
            this.isAuthenticated = !!user;
        })
    }
    onSaveData() {
        this.ds.storeRecipes()
    }
    onFetchData() {
        this.ds.fetchRecipes()
    }
    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth'])
    }
    ngOnDestroy(){
        this.userSub.unsubscribe()
    }
}