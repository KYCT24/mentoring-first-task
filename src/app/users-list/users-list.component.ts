import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UserService } from "../service/users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { IUser, ICreateUser } from "../interface/user.interface";

@Component({
    selector: 'app-user-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly userService = inject(UserService);
    
    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.userService.setUsers(response);
            }
        );
        
        this.userService.users$.subscribe(
            users => console.log(users)
        )
    }
    
    deleteUser(id: number) {
        this.userService.deleteUser(id);
    }
    
    editUser(user: IUser) {
        console.log(user);
        this.userService.editUser({
            ...user,
            company: {
                name: user.company.name,
            }
        }
        );
    }
    
    public createUser(formData: ICreateUser) {
        this.userService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.company.name,
            },
        });
    }
}
