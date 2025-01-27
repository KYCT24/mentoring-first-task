import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import { IUser } from "../../interface/user.interface";
import { MatDialog} from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
})

export class UserCardComponent implements OnChanges {
    @Input()
    user!: IUser;
    
    @Output()
    deleteUser = new EventEmitter();
    
    @Output()
    editUser = new EventEmitter();
    
    readonly dialog = inject(MatDialog);
    
    readonly _snackBar = inject(MatSnackBar);
    
    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK');
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && !changes['user'].firstChange) {
            this.openSnackBar('Пользователь изменен!');
        }
    }
    
    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId);
        this.openSnackBar('Пользователь удален!');
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: {user: this.user},
        });
    
        dialogRef.afterClosed().subscribe(editResult => {
            console.log('Модалка закрылась, результат:', editResult);
            if (editResult) {
                this.editUser.emit(editResult);
            };
        });
    }
}
