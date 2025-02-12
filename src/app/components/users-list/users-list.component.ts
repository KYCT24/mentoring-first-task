import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "../users-list/user-card/user-card.component";
import { UsersService } from "../service/users.service";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";
import { IUser, ICreateUser } from "../interface/user.interface";
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
    public readonly usersService: UsersService = inject(UsersService);
    public readonly dialog: MatDialog = inject(MatDialog);
    
    constructor() {
        this.usersService.loadUsers();
    }
    
    public deleteUser(id: number): void {
        this.usersService.deleteUser(id);
    }
    
    public editUser(user: IUser): void {
        console.log(user);
        this.usersService.editUser(user);
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
        this.usersService.createUser({
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
