import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    expiresIn: string,
    localId: string,
    refreshToken: string,
    idToken: string,
    email: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;

    constructor(private http: HttpClient
        ,private router:Router) {
    }
    login(email: string, password: string) {
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADv_jTohB4HjY3iopZj3b6xWnHWDI54Uo';
        return this.http.post<AuthResponseData>(URL,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            }))
    }
    autoLogin() {
        const userData: {
            email: string
            , id: string,
            _token: string,
            _tokenExpirationTimer: string
        } = JSON.parse(localStorage.getItem("userData"))
        if (!userData) return;
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationTimer))
        if(loadedUser.token) {
            this.user.next(loadedUser)
            const expirationduration  = new Date(userData._tokenExpirationTimer).getTime() - new Date().getTime()
            this.autoLogout(expirationduration)
        }
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout()
        },expirationDuration)
    }
    signup(email: string, password: string) {
        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADv_jTohB4HjY3iopZj3b6xWnHWDI54Uo';
        return this.http.post<AuthResponseData>(URL,
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
            }))
    }
    private handleError(error: HttpErrorResponse) {
        let eMessage = "unknown error occured!"
        if (!error.error || !error.error.error)
            return throwError(eMessage)
        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                eMessage = 'this email already exists!'
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                eMessage = 'Wrong Email Or Password'
                break;
        }
        return throwError(eMessage)
    }

    private handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userID, token, expirationDate)
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user));//to string
    }
}