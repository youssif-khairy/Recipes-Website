import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    constructor(private authService: AuthService,
    private router:Router) { }

    onSubmit(f: NgForm) {
        if (!f.valid) return;
        const email = f.value.email;
        const password = f.value.password;
        this.isLoading = true;
        let authObs: Observable<AuthResponseData>;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        }
        else {
            authObs = this.authService.signup(email, password)
        }
        authObs.subscribe(responseData => {
            this.isLoading = false;
            this.router.navigate(['./recipes'])
        }, (errorMessage) => {
            this.error = errorMessage

            this.isLoading = false;
        });

        f.reset();
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}