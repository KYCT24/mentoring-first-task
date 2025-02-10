import { Component, EventEmitter, inject, Output } from "@angular/core";
import { 
    FormBuilder,
    FormControl, 
    FormGroup, 
    ReactiveFormsModule, 
    Validators 
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ICreateUser } from "../../../interface/user.interface";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-create-user-dialog",
    templateUrl: "./create-user-dialog.component.html",
    styleUrl: "./create-user-dialog.component.scss",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ]
})

export class CreateUserDialogComponent {
    private readonly dialogRef: MatDialogRef<ICreateUser> = inject(MatDialogRef<CreateUserDialogComponent>);
    private fb: FormBuilder = inject(FormBuilder);
    
    public form: FormGroup = this.fb.group({
        name: ['',[Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        website: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        company: this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
        }),
    });
    
    public submitForm(): void {
        this.dialogRef.close(this.form.value);
    }
}


