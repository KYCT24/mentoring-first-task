import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { UsersApiService } from "../service/users-api.service";
import { UserCardComponent } from "../users-list/user-card/user-card.component";
import { IUser, ICreateUser } from "../interface/user.interface";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "../users-list/create-user-dialog/create-user-dialog.component";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selector";

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

    public readonly dialog: MatDialog = inject(MatDialog);
    
    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectUsers);
    
    constructor() {

        this.store.dispatch(UsersActions.load());
    }
    
    public deleteUser(id: number): void {

        this.store.dispatch(UsersActions.delete({ id }));
    }
    
    public editUser(user: IUser): void {
        this.store.dispatch(UsersActions.edit({ user }));
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

        this.store.dispatch(UsersActions.create({
            user: {
                id: new Date().getTime(),
                name: user.name,
                email: user.email,
                website: user.website,
                phone: user.phone,
                company: {
                    name: user.company.name,
                },
            }
        }));
    }
}
