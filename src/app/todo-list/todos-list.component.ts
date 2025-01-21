import { NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TodosApiService } from "./todos-api.service";
import { TodoCardComponent } from "./todo-card/todo-card.component";

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
    imports: [NgFor, TodoCardComponent] 
})

export class TodosListComponent {
    readonly TodosApiService = inject(TodosApiService);
    Todos: Todo[] = [];
    
     constructor() {
        this.TodosApiService.getTodos().subscribe(
            (response: any) => {
                this.Todos = response;
            }
        );
    }
    
    deleteTodo(id: number) {
        this.Todos = this.Todos.filter(
            item => {
                if (id === item.id) {
                    return false
                } else {
                    return true
                }
            }
        );
    }
}
