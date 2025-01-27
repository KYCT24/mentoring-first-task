import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../service/todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../service/todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { ICreateTodo, ITodo } from "../interface/todo.interface";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly TodosApiService = inject(TodosApiService);
    readonly TodosService = inject(TodosService);
    
     constructor() {
        this.TodosApiService.getTodos().subscribe(
            (response: any) => {
                this.TodosService.setTodos(response);
            }
        );
                
        this.TodosService.todos$.subscribe(
            todos => console.log(todos)
        )
    }
    
    deleteTodo(id: number) {
        this.TodosService.deleteTodo(id);
    }
    
    editTodo(todo: ITodo) {
        console.log(todo);
        this.TodosService.editTodos({
            ...todo
        });
    }
    
    public createTodo(formData: ICreateTodo) {
        this.TodosService.createTodo({
            id: new Date().getTime(),
            userId: formData.userId,
            title: formData.title,
            completed: formData.completed,
        });
    }
}
