import { Component, EventEmitter, inject, Output } from "@angular/core";
import { 
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

@Component({
    selector: "app-create-user-form",
    templateUrl: "./create-user-form.component.html",
    styleUrl: "./create-user-form.component.scss",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ]
})

export class CreateUserFormComponent {
    @Output()
    createUser = new EventEmitter();
    
    readonly _snackBar = inject(MatSnackBar);
    
    public form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        website: new FormControl('', [Validators.required, Validators.minLength(3)]),
        company: new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        }),
    });
    
    public submitForm(): void {
        this.createUser.emit(this.form.value);
        this.form.reset();
        this.openSnackBar('Пользователь успешно создан');
    }
    
    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK');
    }
}
