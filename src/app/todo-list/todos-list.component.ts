import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "./todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodoService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export interface CreateTodoI {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

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
    readonly TodosService = inject(TodoService);
    
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
    
    public createTodo(formData: CreateTodoI) {
        this.TodosService.createTodo({
            id: new Date().getTime(),
            userId: formData.userId,
            title: formData.title,
            completed: formData.completed,
        });
    }
}
