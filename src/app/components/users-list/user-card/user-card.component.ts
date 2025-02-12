import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { IUser } from "../../../interface/user.interface";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { CustomUpperCasePipe } from "../../../pipes/upper-case.pipe";
import { CustomRemoveDashes } from "../../../pipes/remove-dashes.pipe";
import { Subject, takeUntil } from "rxjs";
import { RedDirective } from "../../../directives/red-directive";
import { MatTooltip } from "@angular/material/tooltip";


@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatDialogModule, CustomUpperCasePipe, CustomRemoveDashes, RedDirective, MatTooltip]
})

export class UserCardComponent  {
    private readonly dialog: MatDialog = inject(MatDialog);
    private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
    private destroy$ = new Subject<void>();
    
    @Input()
    public user!: IUser;
    
    @Output()
    public deleteUser: EventEmitter<number> = new EventEmitter<number>();
    
    @Output()
    public editUser: EventEmitter<IUser> = new EventEmitter<IUser>();
    
    public openDialogDelete(): void {
        const dialogRef: MatDialogRef<DeleteUserDialogComponent> = this.dialog.open(DeleteUserDialogComponent, {
            width: '600px',
            data: {user: this.user},
        });
    
        dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((result: Boolean | undefined): void => {
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
    
    public openDialogEdit(): void {
        const dialogRef: MatDialogRef<EditUserDialogComponent> = this.dialog.open(EditUserDialogComponent, {
            data: {user: this.user},
        });
    
        dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(results => {
            console.log('Модалка закрылась, результат:', results);
            if (results) {
                this.editUser.emit(results);
            };
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
