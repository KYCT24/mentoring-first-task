import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { IUser } from "../../interface/user.interface";

@Component({
    standalone: true,
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogClose],
})

export class EditUserDialogComponent {
    private readonly data: {user: IUser} = inject<{ user: IUser}>(MAT_DIALOG_DATA);
    private readonly dialogRef: MatDialogRef<IUser> = inject(MatDialogRef<EditUserDialogComponent>);
    private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
    
    public form: FormGroup = new FormGroup({
        name: new FormControl<string>(this.data.user.name,[Validators.required, Validators.minLength(2)]),
        email: new FormControl<string>(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl<string>(this.data.user.website, [Validators.required, Validators.minLength(3)]),
        phone: new FormControl<string>(this.data.user.phone, [Validators.required, Validators.minLength(5)]),
        company: new FormGroup({
            name: new FormControl<string>(this.data.user.company.name, [Validators.required, Validators.minLength(2)]),
        }),
    });
    
    public openSnackBar(): void {
        this._snackBar.open('Пользователь изменен!', 'OK', {
            duration: 3000
        });
    }
    
    public submitForm(): void {
        this.dialogRef.close({...this.form.value, id: this.data.user.id});
        this.openSnackBar();
    }
}
