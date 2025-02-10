import { Component, inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ITodo } from "../../../interface/todo.interface";
import { completedValidator } from "../create-todo-form/create-todo-form.component";

@Component({
    standalone: true,
    selector: 'app-edit-todo-dialog',
    templateUrl: './edit-todo-dialog.component.html',
    styleUrls: ['./edit-todo-dialog.component.scss'],
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogClose],
})

export class EditTodoDialogComponent {
    readonly data = inject<{ todo: ITodo}>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<EditTodoDialogComponent>);
    readonly _snackBar = inject(MatSnackBar);
    
    public form = new FormGroup({
        title: new FormControl(this.data.todo.title,[Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/)]),
        userId: new FormControl(this.data.todo.userId, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
        completed: new FormControl(this.data.todo.completed === true ? 'да' : 'нет', [Validators.required, completedValidator()]),
    });
    
    private getCompletedValue(): boolean {
        const value = this.form.get('completed')?.value!.trim().toLowerCase();
        if (value === 'да') {
            return true;
        } else {
            return false;
        }
    }
    
    openSnackBar() {
        this._snackBar.open('Задача обновлена!', 'OK');
    }
    get todoWithUpdatedFields() {
        return { 
            ...this.form.value,
            completed: this.getCompletedValue(),
            id: this.data.todo.id,
        };
    }
    
    constructor() {
        console.log(this.data);
        this.todoWithUpdatedFields;
        console.log(this.data.todo);
    }
}