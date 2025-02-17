import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IUserRole } from "../interface/user.interface";

@Injectable({providedIn: 'root'})

export class UserService {
    private readonly router = inject(Router);
    private readonly userSubject$:BehaviorSubject<IUserRole | null> = new BehaviorSubject<IUserRole | null>(null);
    public readonly user$: Observable<IUserRole | null> = this.userSubject$.asObservable();
    
    constructor() {
        this.router
    }
    
    private user: IUserRole = {
        name: 'Maxim',
        email: 'maxim@ya.ru',
        isAdmin: null,
    }
    
    public loginAsAdmin() {
        this.userSubject$.next({...this.user, isAdmin: true});
    }
    
    public loginAsUser() {
        this.userSubject$.next({...this.user, isAdmin: false});
    }
    
    public get isAdmin(): boolean | null {
        if (this.userSubject$.value) {
            return this.userSubject$.value?.isAdmin;
        } else {
            return false;
        }
    }
    
    public logout() {
        this.userSubject$.next(null);
        this.router.navigate(['']).then((result: boolean) => false)
    }
}
