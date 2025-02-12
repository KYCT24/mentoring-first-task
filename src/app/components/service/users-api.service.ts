import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUser } from "../interface/user.interface";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersApiService {
    readonly apiService: HttpClient = inject(HttpClient);
    getUsers(): Observable<IUser[]> {
        return this.apiService.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
    }
}
