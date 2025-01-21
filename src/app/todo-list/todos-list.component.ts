import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "./todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodoService } from "../todos.service";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly TodosApiService = inject(TodosApiService);
    readonly TodosService = inject(TodoService);
    Todos: Todo[] = [];
    
     constructor() {
        this.TodosApiService.getTodos().subscribe(
            (response: any) => {
                this.TodosService.setTodos(response);
            }
        );
    }
    
    deleteTodo(id: number) {
        this.TodosService.deleteTodo(id);
    }
}
