import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import { IUser } from "../../../interface/user.interface";
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { CustomUpperCasePipe } from "../../../pipes/upper-case.pipe";
import { CustomRemoveDashes } from "../../../pipes/remove-dashes.pipe";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatDialogModule, CustomUpperCasePipe, CustomRemoveDashes]
})

export class UserCardComponent implements OnChanges {
    @Input()
    user!: IUser;
    
    @Output()
    deleteUser = new EventEmitter<number>();
    
    @Output()
    editUser = new EventEmitter<IUser>();
    
    readonly dialog = inject(MatDialog);
    
    readonly _snackBar = inject(MatSnackBar);
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && !changes['user'].firstChange) {
            this._snackBar.open('Пользователь удален!', 'OK', {
                duration: 3000
            });
        }
    }
    
    openDialogDelete(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            width: '600px',
            data: {user: this.user},
        });
    
        dialogRef.afterClosed().subscribe((result: Boolean | undefined) => {
            if (result) {
                this.deleteUser.emit(this.user.id);
                this._snackBar.open('Пользователь удален!', 'OK', {
                    duration: 3000
                });

            } else {
                this._snackBar.open('Отмена удаления', 'OK', {
                    duration: 3000
                });
            }
        });
    }
    
    openDialogEdit(): void {
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
