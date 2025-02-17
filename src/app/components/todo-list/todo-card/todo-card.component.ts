import { Component, EventEmitter, inject, Input, Output, SimpleChanges} from "@angular/core";
import { ITodo } from "../../interface/todo.interface";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { CustomLimitString } from "../../pipes/limit-string.pipe";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, CustomLimitString]
})

export class TodoCardComponent {
    @Input()
    todo!: ITodo;
    
    @Output()
    deleteTodo = new EventEmitter()
    
    @Output()
    editTodo = new EventEmitter();
    
    readonly dialog = inject(MatDialog);
    
    readonly _snackBar = inject(MatSnackBar);
    
    openSnackBar(message: string) {
        this._snackBar.open(message, 'OK');
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['todo'] && !changes['todo'].firstChange) {
            this.openSnackBar('Задача изменена!');
        }
    }
    
    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
        this.openSnackBar('Задача удален!');
    }
    
    openDialog(): void {
        const dialogRef = this.dialog.open(EditTodoDialogComponent, {
            data: {todo: this.todo},
        });
    
        dialogRef.afterClosed().subscribe(editResult => {
            if (editResult) {
                this.editTodo.emit(editResult);
            };
        });
    }
}
