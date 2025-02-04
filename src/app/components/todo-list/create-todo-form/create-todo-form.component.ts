import { Component, EventEmitter, inject, Output } from "@angular/core";
import { 
    AbstractControl,
    FormControl, 
    FormGroup, 
    ReactiveFormsModule, 
    ValidationErrors, 
    ValidatorFn, 
    Validators 
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim().toLowerCase();
        if (value === 'да' || value === 'нет') {
            return null;
        }
        return {invalidCompleted: true};
    };
}



@Component({
    selector: "app-create-todo-form",
    templateUrl: "./create-todo-form.component.html",
    styleUrl: "./create-todo-form.component.scss",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ]
})

export class CreateTodoFormComponent {
    @Output()
    createTodo = new EventEmitter();
    
    readonly _snackBar = inject(MatSnackBar);
    
    public form = new FormGroup({
        title: new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/)]),
        userId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
        completed: new FormControl('', [Validators.required, completedValidator()]),
    });
    
    private getCompletedValue(): boolean {
        const value = this.form.get('completed')?.value!.trim().toLowerCase();
        if (value === 'да') {
            return true;
        } else {
            return false;
        }
    }
    
    public submitForm(): void {
        this.createTodo.emit({...this.form.value, completed: this.getCompletedValue() });
        this.form.reset();
        this.openSnackBar('Задача успешно создана');
    }
    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK');
    }
}
