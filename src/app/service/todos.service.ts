import { Injectable } from "@angular/core";
import { ITodo } from "../interface/todo.interface";
import { BehaviorSubject } from "rxjs";
import { FormGroup } from "@angular/forms";


@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject$ = new BehaviorSubject<ITodo[]>([]);
    todos$ = this.todosSubject$.asObservable();
    
    setTodos(todos: ITodo[]) {
        this.todosSubject$.next(todos);
    }
    
    editTodos(editedTodos: ITodo) {
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
    createTodo(todo: ITodo) {
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
