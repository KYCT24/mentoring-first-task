import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { UsersApiService } from "../../service/users-api.service";
import { UserCardComponent } from "../users-list/user-card/user-card.component";
import { UserService } from "../../service/users.service";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";
import { IUser, ICreateUser } from "../../interface/user.interface";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "../users-list/create-user-dialog/create-user-dialog.component";

@Component({
    selector: 'app-user-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersListComponent {
    public readonly usersApiService: UsersApiService = inject(UsersApiService);
    public readonly userService: UserService = inject(UserService);
    public readonly dialog: MatDialog = inject(MatDialog);
    
    constructor() {
        this.userService.loadUsers();
    }
    
    public deleteUser(id: number): void {
        this.userService.deleteUser(id);
    }
    
    public editUser(user: IUser): void {
        console.log(user);
        this.userService.editUser(user);
    }
    
    public openDialogCreate(): void {
        const dialogRef = this.dialog.open(CreateUserDialogComponent);
        
        dialogRef.afterClosed().subscribe((result: ICreateUser | null) => {
            if (result) {
                this.createUser(result);
            };
        });
    }
    
    public createUser(user: ICreateUser): void {
        this.userService.createUser({
            id: new Date().getTime(),
            name: user.name,
            email: user.email,
            website: user.website,
            phone: user.phone,
            company: {
                name: user.company.name,
            },
        });
    }
}
