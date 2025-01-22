import { Injectable } from "@angular/core";
import { Todo } from "./todo-list/todos-list.component";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class TodoService {
    private todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();
    
    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos);
    }
    
    editTodos(editedTodos: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => {
                    if (todo.id === editedTodos.id) {
                        return editedTodos
                    } else {
                        return todo
                    }
                }
            )
        );
    }
    createTodo(todo: Todo) {
        const existingTodo = this.todosSubject$.value.find(
            currentElement => currentElement.title === todo.title
        );
        
        if(existingTodo !== undefined) {
            alert('Такая задача уже существует');
        } else {
            this.todosSubject$.next([...this.todosSubject$.value, todo]);
            alert('Задача создана');
        }
    }
    
    deleteTodo(id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                item => {
                    if (id === item.id) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        )
    }
}
