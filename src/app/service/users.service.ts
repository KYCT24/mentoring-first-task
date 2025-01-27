import { Injectable } from "@angular/core";
import { IUser } from "../interface/user.interface";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {
    private usersSubject$ = new BehaviorSubject<IUser[]>([]);
    users$ = this.usersSubject$.asObservable();
    
    setUsers(users: IUser[]) {
        this.usersSubject$.next(users);
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
    }
    createUser(user: IUser) {
        const existingUser = this.usersSubject$.value.find(
            currentElement => currentElement.email === user.email
        );
        
        if(existingUser !== undefined) {
            alert('Такой емейл уже зарегестрирован');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
            alert('Пользователь зарегестрирован');
        }
    }
    
    deleteUser(id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                item => {
                    if (id === item.id) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        )
    }
}
