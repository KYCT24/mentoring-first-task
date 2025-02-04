import { inject, Injectable } from "@angular/core";
import { IUser } from "../interface/user.interface";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { UsersApiService } from "./users-api.service";

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly localStorageUsersKey: string = 'users';
    private readonly LocalStorageService = inject(LocalStorageService);
    private usersSubject$ = new BehaviorSubject<IUser[]>([]);
    private readonly usersApiService: UsersApiService = inject(UsersApiService);
    users$ = this.usersSubject$.asObservable();
    
    setUsers(usersData: IUser[]): void {
        this.LocalStorageService.saveDataLocalStorage<IUser[]>(
            this.localStorageUsersKey,
            usersData
        );
        this.usersSubject$.next(usersData);
    }
    
    loadUsers(): void {
        const loadStorageUsers = this.LocalStorageService.getDataLocalStorage<IUser[]>(
            this.localStorageUsersKey
        );
        if (loadStorageUsers) {
            this.usersSubject$.next(loadStorageUsers);
            console.log(loadStorageUsers);
        } else {
            this.usersApiService.getUsers().subscribe((users: IUser[]): void => {
                this.setUsers(users)
            });
        }

    }
    
    editUser(editedUser: IUser) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser
                    } else {
                        return user
                    }
                }
            )
        );
        this.setUsers(this.usersSubject$.value);
    }
    
    createUser(user: IUser) {
        const existingUser = this.usersSubject$.value.find(
            currentElement => currentElement.email === user.email
        );
        
        if(existingUser !== undefined) {
            alert('Такой емейл уже зарегестрирован');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
            this.setUsers(this.usersSubject$.value);
            alert('Пользователь зарегестрирован');
        }
    }
    
    deleteUser(id: number) {
        const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id)
        
        this.setUsers(updatedUsers);
        
        if (!this.usersSubject$.value.length) {
            this.LocalStorageService.removeDataLocalStorage<IUser[]>(this.localStorageUsersKey);
        }
    }
}
